/**
 * Datadog RUM (Real User Monitoring) 초기화
 */
(function() {
  try {
    var isBot = detectBot();

    // 세션 시작 전 데이터 버퍼링 (봇이 아닌 경우만)
    let __rumBuffer = { performance: {}, events: [], errors: [] };
    let __rumBufferCleanup = null;

    if (!isBot) {
      const BUFFER_MAX = 50;
      const observers = [];

      // Performance 수집
      try {
        if (typeof PerformanceObserver !== 'undefined') {
          // LCP
          try {
            const lcpObs = new PerformanceObserver(function(list) {
              const entries = list.getEntries();
              if (entries.length > 0) {
                __rumBuffer.performance.lcp = entries[entries.length - 1].startTime;
              }
            });
            lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
            observers.push(lcpObs);
          } catch (e) { /* largest-contentful-paint 미지원 브라우저 무시 */ }

          // FCP
          try {
            const fcpObs = new PerformanceObserver(function(list) {
              const entries = list.getEntries();
              for (let i = 0; i < entries.length; i++) {
                if (entries[i].name === 'first-contentful-paint') {
                  __rumBuffer.performance.fcp = entries[i].startTime;
                }
              }
            });
            fcpObs.observe({ type: 'paint', buffered: true });
            observers.push(fcpObs);
          } catch (e) { /* paint 미지원 브라우저 무시 */ }

          // CLS
          try {
            __rumBuffer.performance.cls = 0;
            const clsObs = new PerformanceObserver(function(list) {
              const entries = list.getEntries();
              for (let i = 0; i < entries.length; i++) {
                if (!entries[i].hadRecentInput) {
                  __rumBuffer.performance.cls += entries[i].value;
                }
              }
            });
            clsObs.observe({ type: 'layout-shift', buffered: true });
            observers.push(clsObs);
          } catch (e) { /* layout-shift 미지원 브라우저 무시 */ }

          // FID
          try {
            const fidObs = new PerformanceObserver(function(list) {
              const entries = list.getEntries();
              if (entries.length > 0) {
                __rumBuffer.performance.fid = entries[0].processingStart - entries[0].startTime;
              }
            });
            fidObs.observe({ type: 'first-input', buffered: true });
            observers.push(fidObs);
          } catch (e) { /* first-input 미지원 브라우저 무시 */ }

          // TTFB
          try {
            const navObs = new PerformanceObserver(function(list) {
              const entries = list.getEntries();
              if (entries.length > 0) {
                __rumBuffer.performance.ttfb = entries[0].responseStart;
              }
            });
            navObs.observe({ type: 'navigation', buffered: true });
            observers.push(navObs);
          } catch (e) { /* navigation 미지원 브라우저 무시 */ }

          // INP
          try {
            const inpObs = new PerformanceObserver(function(list) {
              const entries = list.getEntries();
              for (let i = 0; i < entries.length; i++) {
                const duration = entries[i].duration;
                if (!__rumBuffer.performance.inp || duration > __rumBuffer.performance.inp) {
                  __rumBuffer.performance.inp = duration;
                }
              }
            });
            inpObs.observe({ type: 'event', buffered: true, durationThreshold: 16 });
            observers.push(inpObs);
          } catch (e) { /* event 미지원 브라우저 무시 */ }
        }
      } catch (e) { /* PerformanceObserver 전체 미지원 무시 */ }

      // 이벤트 수집
      const bufferEventTypes = ['click', 'scroll', 'keydown'];
      const onBufferEvent = function(e) {
        if (__rumBuffer.events.length >= BUFFER_MAX) {
          __rumBuffer.events.shift();
        }
        const target = e.target;
        let targetStr = target ? target.tagName || '' : '';
        if (target && target.id) targetStr += '#' + target.id;
        if (target && target.className && typeof target.className === 'string') {
          targetStr += '.' + target.className.split(' ').join('.');
        }
        __rumBuffer.events.push({
          type: e.type,
          target: targetStr,
          timestamp: Date.now()
        });
      };
      bufferEventTypes.forEach(function(type) {
        document.addEventListener(type, onBufferEvent, { passive: true, capture: true });
      });

      // 에러 수집
      const onBufferError = function(e) {
        if (__rumBuffer.errors.length >= BUFFER_MAX) {
          __rumBuffer.errors.shift();
        }
        __rumBuffer.errors.push({
          message: e.message || 'Unknown error',
          filename: e.filename || '',
          lineno: e.lineno || 0,
          colno: e.colno || 0,
          timestamp: Date.now()
        });
      };
      const onBufferRejection = function(e) {
        if (__rumBuffer.errors.length >= BUFFER_MAX) {
          __rumBuffer.errors.shift();
        }
        const reason = e.reason;
        __rumBuffer.errors.push({
          message: reason ? (reason.message || String(reason)) : 'Unhandled rejection',
          filename: '',
          lineno: 0,
          colno: 0,
          timestamp: Date.now()
        });
      };
      window.addEventListener('error', onBufferError);
      window.addEventListener('unhandledrejection', onBufferRejection);

      // 클린업 함수
      __rumBufferCleanup = function() {
        for (let i = 0; i < observers.length; i++) {
          try { observers[i].disconnect(); } catch (e) {}
        }
        bufferEventTypes.forEach(function(type) {
          document.removeEventListener(type, onBufferEvent, { capture: true });
        });
        window.removeEventListener('error', onBufferError);
        window.removeEventListener('unhandledrejection', onBufferRejection);
      };
    }

    (function(h,o,u,n,d) {
      h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
      d=o.createElement(u);d.async=1;d.src=n

      d.onerror=function(){
        console.warn('Datadog RUM SDK failed to load. User monitoring will be disabled.');
        // SDK 로드 실패 시 버퍼/리스너 정리
        if (__rumBufferCleanup) {
          __rumBufferCleanup();
          __rumBufferCleanup = null;
        }
        __rumBuffer = { performance: {}, events: [], errors: [] };
      }

      n=o.getElementsByTagName(u)[0];if(n&&n.parentNode){n.parentNode.insertBefore(d,n)}else{o.head.appendChild(d)}
    })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')

    // SDK 로드 타임아웃: 30초 내 로드 안 되면 리소스 정리
    var __rumLoadTimeout = setTimeout(function() {
      if (__rumBufferCleanup) {
        __rumBufferCleanup();
        __rumBufferCleanup = null;
      }
      __rumBuffer = { performance: {}, events: [], errors: [] };
    }, 30000);

    window.DD_RUM.onReady(function() {
      clearTimeout(__rumLoadTimeout);
      try {
        var siteTier = typeof SITE_CODE !== 'undefined' ? getTierBySiteCode(SITE_CODE) : 5;
        var sessionSampleRate = typeof SITE_CODE !== 'undefined' ? getSessionSampleRate(SITE_CODE, siteTier) : 0;

        window.DD_RUM.init({
          clientToken: 'pub4b0d7410f941f04271a5ef090eb48d87',
          applicationId: 'bcdd1a85-8a90-4c8c-8594-8a3f35984f6e',
          site: 'datadoghq.com',
          service: 'brand-site',
          env: typeof TEST_SERVER !== 'undefined' && !TEST_SERVER ? 'prod' : 'dev',
          version: '260131',
          sessionSampleRate: sessionSampleRate,
          sessionReplaySampleRate: 0,
          trackAnonymousUser: false,
          trackingConsent: 'not-granted',
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          trackBfcacheViews: true,
          defaultPrivacyLevel: 'mask-user-input',
          beforeSend: function(event) {
            // error 이벤트의 경우 MFE 버전 추적
            if (event.type === 'error') {
              const mfeVersion = event.context && event.context.mfe && event.context.mfe.version;
              if(mfeVersion) {
                event.version = mfeVersion;
                return true;
              }
            }

            // view 이벤트의 경우 실제 time_spent 값 기준으로 10초 이상 체류 판단
            // time_spent 단위: 나노초 (10초 = 10,000,000,000 ns)
            if (event.type === 'view' && event.view && event.view.time_spent >= 10000000000) {
              event.context = event.context || {};
              event.context.session_retained_10s = true;
            }

            if (event.type === 'resource') {
              if (!event.resource || !event.resource.url) {
                return false;
              }
              const url = event.resource.url;

              // API 호출만 추적
              if (event.resource.type === 'fetch' || event.resource.type === 'xhr') {
                return true;
              }

              // MFE 앱 번들만 추적
              if (url.indexOf('/_/') !== -1) {
                return true;
              }

              // 나머지 리소스는 제외
              return false;
            }
            return true;
          }
        });

        // 레거시 세션 리플레이 강제 중지
        // 장기 접속자들이 예전 설정(sessionReplaySampleRate > 0)으로 리플레이를 수집하는 것을 방지
        // TODO 세션 리플레이가 0으로 수렴하면 제거할 것
        if (typeof window.DD_RUM.stopSessionReplayRecording === 'function') {
          try {
            window.DD_RUM.stopSessionReplayRecording();
          } catch (e) {
            console.warn('[Datadog RUM] 리플레이 중지 실패:', e);
          }
        }

        // init 실행 시점 기록 (페이지 로드 후 ms)
        var initTimeMs = typeof performance !== 'undefined' && performance.now
          ? Math.round(performance.now() * 100) / 100
          : 0;
        window.DD_RUM.setGlobalContextProperty('init_time_ms', initTimeMs);

        window.DD_RUM.setAccount({
          ...(typeof SITE_CODE !== 'undefined' && { id: SITE_CODE, site_tier: siteTier }),
          ...(typeof UNIT_CODE !== 'undefined' && { unit_code: UNIT_CODE }),
          ...(typeof USE_SHOP_IN_SHOP !== 'undefined' && { use_shop_in_shop: USE_SHOP_IN_SHOP })
        });

        window.DD_RUM.setUser({
          ...(typeof MEMBER_HASH !== 'undefined' && MEMBER_HASH && { id: MEMBER_HASH }),
          ...(typeof IS_GUEST !== 'undefined' && { is_guest: IS_GUEST })
        });

        // PoC: 봇 트래픽 분석을 위한 커스텀 속성 추가
        window.DD_RUM.setGlobalContextProperty('is_bot', isBot);

        // 접속 국가 컨텍스트 설정
        if (typeof VIEWER_COUNTRY !== 'undefined' && VIEWER_COUNTRY) {
          window.DD_RUM.setGlobalContextProperty('viewer_country', VIEWER_COUNTRY);
        }

        // 세션 시작 여부 플래그 (중복 실행 방지)
        let sessionStarted = false;

        // 세션 시작 함수 (10초 체류 또는 인터랙션 시 호출)
        const startSession = function(trigger) {
          // 이미 시작됐거나 봇인 경우 무시
          if (sessionStarted || isBot) {
            return;
          }
          sessionStarted = true;

          // 세션 시작 트리거 기록
          window.DD_RUM.setGlobalContextProperty('session_trigger', trigger);

          // 세션 시작 시점 기록 (페이지 로드 후 ms)
          var sessionStartTimeMs = typeof performance !== 'undefined' && performance.now
            ? Math.round(performance.now() * 100) / 100
            : 0;
          window.DD_RUM.setGlobalContextProperty('session_start_time_ms', sessionStartTimeMs);

          window.DD_RUM.setTrackingConsent('granted');

          // 버퍼 flush: 세션 시작 전 수집 데이터 전송
          try {
            // Performance → global context
            if (Object.keys(__rumBuffer.performance).length > 0) {
              window.DD_RUM.setGlobalContextProperty('pre_session_performance', __rumBuffer.performance);
            }

            // Events → addAction
            __rumBuffer.events.forEach(function(e) {
              window.DD_RUM.addAction('pre_session_' + e.type, {
                target: e.target,
                timestamp: e.timestamp
              });
            });

            // Errors → addError
            __rumBuffer.errors.forEach(function(e) {
              window.DD_RUM.addError(new Error(e.message), {
                source: 'pre_session',
                filename: e.filename,
                lineno: e.lineno,
                timestamp: e.timestamp
              });
            });
          } catch (flushError) {
            console.warn('RUM buffer flush failed:', flushError);
          }

          // 버퍼 해제 및 리스너 제거
          if (__rumBufferCleanup) {
            __rumBufferCleanup();
            __rumBufferCleanup = null;
          }
          __rumBuffer = { performance: {}, events: [], errors: [] };

          // 인터랙션 리스너 제거 (더 이상 필요 없음)
          interactionEvents.forEach(function(event) {
            document.removeEventListener(event, onUserInteraction);
          });

          // 10초 타이머 취소 (인터랙션으로 시작된 경우)
          if (sessionStartTimeout) {
            clearTimeout(sessionStartTimeout);
            sessionStartTimeout = null;
          }
        };

        // 10초 체류 시 세션 시작 타이머 (봇이 아닌 경우만)
        let sessionStartTimeout = null;
        if (!isBot) {
          sessionStartTimeout = setTimeout(function() {
            startSession('10s_retention');
          }, 10000);
        }

        // 사용자 인터랙션 감지 (PoC: 유의미한 사용자 구분용)
        const interactionEvents = ['click', 'touchstart', 'keydown'];
        const onUserInteraction = function() {
          // 봇이 아닌 경우에만 세션 시작
          if (!isBot) {
            startSession('user_interaction');
          }
          window.DD_RUM.setGlobalContextProperty('user_interacted', true);
        };
        interactionEvents.forEach(function(event) {
          document.addEventListener(event, onUserInteraction, { passive: true });
        });
      } catch (initError) {
        console.error('Datadog RUM initialization failed:', initError);
      }
    });
  } catch (loadError) {
    console.warn('Datadog RUM setup failed:', loadError);
  }
})();

/**
 * 사이트코드를 파라미터로 받아서 티어(숫자)를 반환하는 함수
 * @param {string} siteCode - 사이트코드
 * @returns {number} - 티어 숫자 (1, 2, 3, 4, 5)
 *
 * [티어 기준]
 * - 1tier: 10개 사이트
 * - 2tier: 30개 사이트
 * - 3tier: 107개 사이트
 * - 4tier: 56개 사이트
 * - 5: 목록에 없는 사이트 (기본값)
 *
 * [최종 업데이트] 2025-01-26
 */
function getTierBySiteCode(siteCode) {
  const tierMap = {
    // ========================================
    // 1tier (10개)
    // ========================================
    'S202406200437484771b55': 1, // nuzam.co.kr
    'S20240510c2ecd48f51a53': 1, // stenny.kr
    'S20200827f25e5df537da9': 1, // daybarrier.co.kr
    'S2024032041c7c75be79bd': 1, // kidzplan.kr
    'S20240903dacb2530c56bb': 1, // bkwell.co.kr
    'S20170613593f9dd00c48f': 1, // lenssis-ko.com
    'S20200901a942bae14250b': 1, // sleeplab.co.kr
    'S20221125e94a33ecf3588': 1, // dadoc.kr
    'S2022022138c14a79bc5bd': 1, // cocodaum.com
    'S2025080148db9b80a6d97': 1, // mahler.imweb.me

    // ========================================
    // 2tier (30개)
    // ========================================
    'S20220103536cb52c56eda': 2, // swagkey.kr
    'S202206294c0a2cc6190f4': 2, // bose.co.kr
    'S20230130b46d4cd7f01da': 2, // coffeeplant.co.kr
    'S2022110438f2e0f11eb44': 2, // yakssamall.com
    'S20190715619285c855898': 2, // biocom.kr
    'S20191204de39eb5660112': 2, // reliv.co.kr
    'S20230111dce31a6b73b33': 2, // closeby2.com
    'S20220211b601322b3a563': 2, // homuro.co.kr
    'S202004206e5cf6ba444c7': 2, // daesungmeat.com
    'S201905275ceb9a864ad4a': 2, // madamjoo.store
    'S202403014d4737531314b': 2, // goldpepper.kr
    'S202304191543afb8b4044': 2, // nu-tir.com
    'S20191212fa9c6e88703fc': 2, // kimwoorishop.com
    'S20240124a66ea0839dc65': 2, // luktkindy.co.kr
    'S20220120fa40c9011cf8d': 2, // insaengdomae.com
    'S201904025ca2b4bdc502b': 2, // fromgod.kr
    'S20190930dd1871f18a4fb': 2, // tunatime.co.kr
    'S2021020805d97882acf12': 2, // 100jinsam.com
    'S20220701ae28ca27ac91b': 2, // dearlabs.kr
    'S202009292a824c25037d6': 2, // likethix.com
    'S201803255ab755f0896c9': 2, // zerotohero.co.kr
    'S201803075a9f8cad87af3': 2, // vitabonbio.com
    'S20200629b683866f4b1fb': 2, // mynormal.shop
    'S20201105d92438da7487a': 2, // musicndrama.com
    'S202303281d5896e2ed8fe': 2, // momu.store
    'S2020041334b66edb88d0c': 2, // ocenth.com
    'S20250717373fc513c55b7': 2, // elnox.co.kr
    'S20250317313ca5153f384': 2, // miraclesydney.co.kr
    'S2023112193f6b6f5df998': 2, // toxwell.co.kr
    'S202412111e201a4d37aec': 2, // richpicks.co.kr

    // ========================================
    // 3tier (107개)
    // ========================================
    'S2024090589cc5fa4b8b3e': 3, // mondcookie.com
    'S202011203188efd3b1811': 3, // oticonmall.com
    'S202211153490901eab54c': 3, // doyak.info
    'S202105071ca6da730c219': 3, // soleusair.co.kr
    'S202009128bc16ee5c1341': 3, // monoha.com
    'S2022042661078fb8a2220': 3, // baeksambogam.co.kr
    'S20200807bf60b4fc4ba55': 3, // fraisbellon.com
    'S202004066d9a49af51087': 3, // doctornoah.net
    'S20220714c9537d425acf6': 3, // ikkei.co.kr
    'S201905235ce64f43f0005': 3, // varram.co.kr
    'S20211126ac34cde76ae41': 3, // 1cmplus.com
    'S202102284be605535ce62': 3, // danp.kr
    'S2022070809b9c24176d78': 3, // au-tumn.com
    'S201908192101f4ecd91a2': 3, // concretebread.com
    'S202101125e9c02237df13': 3, // leereine.com
    'S20230126ae98e057b9fe2': 3, // 웰컴드링크.com
    'S20230605fc80b821a398e': 3, // goblinwear.com
    'S202502210cfc67776d6f1': 3, // 2sbnrshop.co.kr
    'S20221028286612c30e719': 3, // pexumarket.com
    'S201904045ca57751d9c8b': 3, // urte.co.kr
    'S20210830b563c28af6f62': 3, // laclachansang.co.kr
    'S201911266408eeb323255': 3, // presolar.co.kr
    'S20210228829c0d6d3982f': 3, // doorkitchen.info
    'S20230921de20d163409a3': 3, // goldenwool.co.kr
    'S20191210100f3254f0726': 3, // hironicmall.com
    'S20230710753660d59bcf5': 3, // betoki.co.kr
    'S20220306db2bc2bb8f514': 3, // kkongbang.com
    'S201806045b1539d090b13': 3, // havehad.kr
    'S20211211b8a7728ff627d': 3, // simplyworks.kr
    'S20230522494ce3c3311c5': 3, // viptuna.com
    'S202311087a852fafe2dff': 3, // realcumin.kr
    'S2025021417a9d3ee854c6': 3, // thesox.kr
    'S202202283a7ed7e01f857': 3, // factthenerd.com
    'S20231212a637724c4d048': 3, // lamour.co.kr
    'S2022042790be40caeb6d1': 3, // younivclass.com
    'S202311020316fe0a3488f': 3, // dailycookie.co.kr
    'S20240202fd91e1113f52d': 3, // myassist.kr
    'S202311174b3d85fb5d13e': 3, // honored.kr
    'S20220627921120181795a': 3, // yundiet.com
    'S202407042e58df10585aa': 3, // refreelab.com
    'S2021050335f08df5f5a2d': 3, // daily-um.co.kr
    'S202211251a2a46773a0d1': 3, // nscakorea.com
    'S20201116a6acde587de00': 3, // hansroom.co.kr
    'S202105273bc6546319812': 3, // weneed.store
    'S2022080569a349dbeac73': 3, // dreve.co.kr
    'S20210801be668fd10ebc6': 3, // hoodadakshop.kr
    'S20240703dbdc113c2826c': 3, // dblofficial.co.kr
    'S202004032d763e1d03ef0': 3, // gonggan27.com
    'S202310101adbc81b2e083': 3, // knowmuch.kr
    'S201907113034dd87acb66': 3, // doggerbox.com
    'S20220915be69d69ff3da6': 3, // undirty.kr
    'S20231201561f47a2e9b28': 3, // hyunsuhne.com
    'S20231109e070d260b9760': 3, // soap24.co.kr
    'S202506192a5fdf4b76863': 3, // bowerswilkinskorea.co.kr
    'S202003301b5ec14f2fec9': 3, // f-rame.com
    'S20210506a235926732e11': 3, // triamilia.com
    'S2023110501450fb5f3bd8': 3, // wholesale119.com
    'S202107018408fc01acf22': 3, // yohemite.com
    'S2024031460debabded7a1': 3, // gamsungsound.com
    'S20220712333eaa230378d': 3, // wellnessmother.co.kr
    'S20201230aef70c61590f5': 3, // gongysd.com
    'S20240420fb576eddd1cf9': 3, // frenchrecord.com
    'S202211225918cf4c4339f': 3, // sangbeth.com
    'S2017082059993f1d8590e': 3, // fucos.co.kr
    'S20191121352905b2bd341': 3, // nelna.shop
    'S202107158dd5275a11d85': 3, // saenalmarket.com
    'S202005262826c2f96331f': 3, // sunnyoga.imweb.me
    'S20231121fd3d1a8e7fabb': 3, // orefarm.com
    'S201806235b2da4d6655c0': 3, // thelodge.kr
    'S20221018e026e9c6d5c43': 3, // taxntalk.co.kr
    'S20230531e5cb4b181c9e1': 3, // gakihara.com
    'S202110080fdb1a4c199e5': 3, // dro.imweb.me
    'S202302142a0704f9357df': 3, // nabium.kr
    'S201808145b723994e18f9': 3, // samoondoh.co.kr
    'S201808015b61b8958f183': 3, // mongekorea.co.kr
    'S202203117b2e7689790f4': 3, // ureun.com
    'S20210109d4021b623ca2a': 3, // modparty.co.kr
    'S202201207e2973e2fe45c': 3, // klar-list.kr
    'S20240108b932d6b3f18b0': 3, // glame.co.kr
    'S20230828bc3865d68e772': 3, // uldd.net
    'S202410102c15da2dbca51': 3, // ytory.com
    'S20201103b4347fda06226': 3, // futuregrow.co.kr
    'S20220628620dc152737b4': 3, // anotefrom.kr
    'S20200327f803a024afac8': 3, // amazingcre.com
    'S202211297abe07e7bd60d': 3, // coffee.pebblecompany.com
    'S202004034ea3d1c51b202': 3, // mosports.co.kr
    'S201802055a77d9e2e4797': 3, // eenk.co.kr
    'S20241106aa5360b548394': 3, // re-nutri.co.kr
    'S202311272bb74ebee9fd1': 3, // cesrailon.com
    'S2017082759a2a390b3a41': 3, // present-project.love
    'S2019122456e18002f081a': 3, // boolimglobal.com
    'S202407051d690f8328dd1': 3, // detoxschool.co.kr
    'S201701255888586e4ae97': 3, // hobbykorea.com
    'S20191127259e38f514e67': 3, // ffd.co.kr
    'S202405144c87f971d04f3': 3, // peanutforest.com
    'S202207189f916d8782e6a': 3, // studioyarn.co.kr
    'S20230507166a48e442222': 3, // svunit.com
    'S2023050281556f2efb507': 3, // noirlarmes.com
    'S202112207a3590eef0fe1': 3, // sleepino.co.kr
    'S20240501e83168cc7afa0': 3, // keraturn.co.kr
    'S202002248652b9ee41a6b': 3, // jhoutdoor.co.kr
    'S2022012416420e187b419': 3, // paramade-pickers.com
    'S20170531592e1fbe84134': 3, // nbmk.kr
    'S20221102ba6c81fec171b': 3, // bang-olufsen-korea.co.kr
    'S20190710297b319587eea': 3, // freedomcafe.kr
    'S202403272ce80cb51e30f': 3, // amamere.co.kr
    'S202201176e978c97ccadb': 3, // kwstore.co.kr
    'S2025031108611baadebff': 3, // we-go-kr.com
    'S20200210535a50a3dc54c': 3, // pilosophy.me
    'S20220214bc2851f65f1aa': 3, // runnix.kr
    'S202407112a5d9ce5e8fdc': 3, // bbangtrailrun.com
    'S202505298f43791c8b38a': 3, // highclass.io.kr

    // ========================================
    // 4tier (56개)
    // ========================================
    'S202009215be50af2132c2': 4, // manwol.biz
    'S202501237557ec0163822': 4, // shco.co.kr
    'S20240724ac1bfd131f8b5': 4, // 1day1message.com
    'S2017051059127f378a11e': 4, // playmaker.kr
    'S2023122637da506f5b68c': 4, // wabut.co.kr
    'S202008313b654d6a71d20': 4, // garumaster.com
    'S2023050821ca4386285f9': 4, // ynkedu.co.kr
    'S20240404a653c87a42690': 4, // emotional0ranges.com
    'S20230818023ce0d8592df': 4, // youthkit.co.kr
    'S202502137495a14090c99': 4, // imheal.kr
    'S202310100d6802bf42db2': 4, // kitoketo.com
    'S2020092184765bf64ebcd': 4, // toyocraft.kr
    'S201807025b39d1981b0b0': 4, // dogmaru.co.kr
    'S202302070f677667852f9': 4, // ofor.love
    'S202101033075d3abab000': 4, // connect-n.kr
    'S202211030a3dd5044f1c4': 4, // koreadanawa.co.kr
    'S20240813057f60c50c3c8': 4, // runpojang.com
    'S20211111252dfc14b7102': 4, // biono365.com
    'S20230419a7856874d4297': 4, // yoonsl.co.kr
    'S20210702f62f206de8923': 4, // maryhouse.co.kr
    'S20200511c4fae7c2ec83b': 4, // alicemobile.co.kr
    'S2021090376056aa10e9b7': 4, // savage.co.kr
    'S202402133a1a2b4624de1': 4, // dubleve.me
    'S202003027b2d9df62874b': 4, // touchyourbody.com
    'S20220427ac67ef886426d': 4, // ican.co.kr
    'S202208261458981fd435f': 4, // sotd.co.kr
    'S20240131340caa3ad4a55': 4, // iceworks.kr
    'S201904225cbd1f0d25eed': 4, // res-homme.com
    'S20210623e2e4a3bd73371': 4, // reogagu.com
    'S20211022190e320733f12': 4, // hyperice.co.kr
    'S2021060329969bc9594c6': 4, // oregin.com
    'S202110157a7a9ba816794': 4, // hwalgangwon.com
    'S202305294e72b7df34a85': 4, // vitalab365.kr
    'S202002143cc781bb3b139': 4, // azuming.co.kr
    'S2020011905ba18fa469b5': 4, // blacknewyork.co.kr
    'S201904255cc1c565b344c': 4, // masterwook.com
    'S2024012207385124238d5': 4, // choicomma.co.kr
    'S202308159c6e25b46b00b': 4, // goodymall.kr
    'S201906272ab1a48208e7f': 4, // kevinsroom.co.kr
    'S202106210137d99643a01': 4, // gadammall.com
    'S20230919630fe75769f9a': 4, // shopintake.com
    'S202107084c4f22b4b4bb6': 4, // woraksan.co.kr
    'S201905225ce4d147bced4': 4, // lunalab.co.kr
    'S202302219fbe32d53e5be': 4, // bjlvstudio.com
    'S20221011217bfb7b2d170': 4, // highenforetcheongju.com
    'S201903115c8546b3c1b68': 4, // bydfood.co.kr
    'S20200205820bcaf35d17a': 4, // greymansion.co.kr
    'S20190817ca6614c336d30': 4, // bouncebrothers.co.kr
    'S201909273f69b3cfea5a1': 4, // primagekorea.com
    'S20250502e59dd977a900b': 4, // joannatable.imweb.me
    'S2022011952e2f5dbf2e28': 4, // urbansports.kr
    'S202107014a1fc2e22774f': 4  // selite.kr
  };

  return tierMap[siteCode] || 5;
}

/**
 * 사이트 코드와 티어에 따라 세션 샘플링 비율을 반환하는 함수
 * @param {string} siteCode - 사이트코드
 * @param {number} tier - 사이트 티어 (1~5)
 * @returns {number} - 세션 샘플링 비율 (0, 10, 100)
 *
 * [최종 업데이트] 2025-01-30
 */
function getSessionSampleRate(siteCode, tier) {
  // Cypress 테스트 사이트 (https://qacypress-omsv2.imweb.me/)
  if (siteCode === 'S20250813f4d5b772af550') {
    return 100;
  }

  if (tier >= 1 && tier <= 4) {
    return 10;
  }

  return 0;
}

/**
 * 봇/크롤러 감지 함수
 * @returns {boolean} 봇 여부
 * 
 * @reference https://raw.githubusercontent.com/monperrus/crawler-user-agents/master/crawler-user-agents.json
 * 
 * [최종 업데이트] 2025-01-30
 * 
 */
function detectBot() {
  // 내부 Cypress 테스트는 봇으로 감지하지 않음
  if (/ImwebCypressTest/i.test(navigator.userAgent)) {
    return false;
  }

  // 1단계: 자동화 도구 감지
  if (navigator.webdriver) {
    return true;
  }

  var userAgent = navigator.userAgent;

  // 2단계: 봇 패턴 매칭
  var botPatterns = new RegExp(
    [
      /bot/,
      /spider/,
      /crawl/,
      /scraper/,
      /fetcher/,
      // Google
      /APIs-Google/,
      /AdsBot/,
      /Googlebot/,
      /mediapartners/,
      /Google Favicon/,
      /FeedFetcher/,
      /Google-Read-Aloud/,
      /DuplexWeb-Google/,
      /googleweblight/,
      /Storebot-Google/,
      /Google-InspectionTool/,
      /GoogleOther/,
      /Google-Adwords-Instant/,
      /AppEngine-Google/,
      /Google Web Preview/,
      /google-xrawler/,
      /Google-Structured-Data-Testing-Tool/,
      /Google-Site-Verification/,
      /Google-Safety/,
      /Google-Ads-Conversions/,
      // Search Engines
      /bing/,
      /yandex/,
      /baidu/,
      /duckduck/,
      /yahoo/,
      /ecosia/,
      /ia_archiver/,
      /sogou/,
      /NAVER Blog Rssbot/,
      // OG 크롤러
      /facebookexternalhit/,
      /Facebot/,
      /facebookcatalog/,
      /meta-externalagent/,
      /meta-externalads/,
      /Twitterbot/,
      /LinkedInBot/,
      /Slackbot/,
      /Discordbot/,
      /TelegramBot/,
      /WhatsApp\//,
      /Pinterestbot/,
      /redditbot/,
      /kakaotalk-scrap/,
      /Viber/,
      /TikTokSpider/,
      /MicrosoftPreview/,
      // SEO & AI
      /semrush/,
      /ahrefs/,
      /GPTBot/,
      /ChatGPT/,
      /Claude-Web/,
      /anthropic/,
      /Bytespider/,
      /CCBot/,
      /PerplexityBot/,
      // Amazon & Cloudflare
      /Amazonbot/,
      /AmazonProductDiscovery/,
      /Amazon CloudFront/,
      /CloudFlare-AlwaysOnline/,
      /Cloudflare-Healthchecks/,
      // Monitoring
      /pingdom/,
      /gtmetrix/,
      /pagespeed/,
      /lighthouse/,
      /uptimerobot/,
      /Uptime-Kuma/,
      /DatadogSynthetics/,
      // HTTP 클라이언트
      /wget/,
      /curl/,
      /Commons-HttpClient/,
      /Python-urllib/,
      /python-requests/,
      /aiohttp/,
      /httpx/,
      /libwww/,
      /httpunit/,
      /nutch/,
      /httrack/,
      /Go-http-client/,
      /okhttp/,
      /Apache-HttpClient/,
      /axios/,
      /node-fetch/,
      // Headless
      /headless/,
      /phantom/,
      /selenium/,
      /puppeteer/,
      /playwright/,
      // 레거시/기타 봇
      /slurp/,
      /teoma/,
      /convera/,
      /gigablast/,
      /heritrix/,
      /findlink/,
      /panscient/,
      /yeti/,
      /ichiro/,
      /coccoc/,
      /proximic/,
      /changedetection/,
      /linkdex/,
      /ezooms/,
      /summify/,
      /ec2linkfinder/,
      /postrank/,
      /page2rss/,
      /lipperhey/,
      /AddThis/,
      /Voyager/,
      /CyberPatrol/,
      /Qwantify/,
      /BUbiNG/,
      /MegaIndex/,
      /ADmantX/,
      /A6-Indexer/,
      /archive\.org_bot/,
      /Applebot/,
      /Scrapy/,
      /g00g1e\.net/,
    ]
      .map(function(r) { return r.source; })
      .join('|'),
    'i'
  );

  return botPatterns.test(userAgent);
}
