import React from 'react';
import Image from 'next/image';

export const ConstructionInfo = () => {
    return (
        <div className="w-full">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-16 border border-white/10">
                <Image
                    src="/images/business/construction/bus_img01.jpg"
                    alt="Construction Infrastructure"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                    <h2 className="text-3xl md:text-5xl font-bold text-white p-8 md:p-12">
                        Information and Communications
                    </h2>
                </div>
            </div>

            {/* Intro Text */}
            <div className="mb-12">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                    Based on the automatic control system and information system, the company constructs construction infrastructure, such as communication line equipment construction, exchange equipment construction, and transmission equipment construction, based on abundant experience and technology.
                </p>
            </div>

            {/* License Retention Status */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    License Retention Status
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Table */}
                    <div className="flex-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                        <table className="w-full border-collapse text-sm md:text-base">
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { label: 'Type of Licenses', value: 'Information and Communication Works' },
                                    { label: 'Registration Number', value: 'No. 55032' },
                                    { label: 'Company Name', value: 'GENTOP Inc.' },
                                    { label: 'Representative', value: 'Hongdae Park' },
                                    { label: 'Location', value: '#715, 716, 717, Gyeongnam Robotland Foundation, 59, Gwangnyeocheonnam-ro, Naeseo-eup, Masanhoewon-gu, Changwon-si, Gyeongsangnam-do, Republic of Korea' },
                                    { label: 'Registration Date', value: 'April 5th, 2006' }
                                ].map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                        <th className="bg-white/5 p-5 md:p-6 text-left font-bold text-gentop-green w-1/3 md:w-1/4 border-r border-white/5 uppercase tracking-wider text-[10px] md:text-xs">
                                            {item.label}
                                        </th>
                                        <td className="p-5 md:p-6 text-gray-300 group-hover:text-white transition-colors">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Certificate Image */}
                    <div className="lg:w-[360px] shrink-0 mx-auto">
                        <div className="relative aspect-[3/4] rounded-xl border border-white/10 overflow-hidden shadow-lg">
                            <Image
                                src="/images/business/construction/business_img000.jpg"
                                alt="Registration Certificate"
                                fill
                                className="object-contain object-top"
                            />
                        </div>
                        <p className="mt-3 text-center text-sm text-gray-400">Registration Certificate</p>
                    </div>
                </div>
            </div>

            {/* Information and Communication Construction */}
            <div className="mb-20">
                <h3 className="text-2xl font-bold mb-10 text-white border-l-4 border-gentop-green pl-6 flex items-center gap-3">
                    Information and Communication Construction
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4"></span>
                </h3>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                    <table className="w-full border-collapse text-sm md:text-base">
                        <tbody className="divide-y divide-white/5">
                            {[
                                {
                                    label: 'Communication line equipment',
                                    value: 'Constructions of cable tunnel equipment, communications line equipment, communications cable (including optical fiber and coaxial cable, telephone pole, support ironwork, cable emergency equipment, steel tower, pipe, terminal box, etc.) equipment, etc.'
                                },
                                {
                                    label: 'Exchange equipment',
                                    value: 'Constructions of electronic exchange (including ISDN and full electronic) equipment , automatic exchange equipment, asynchronous exchange (ATM) equipment, subscriber line-focused maintenance and operation system equipment, centralized telephone exchange equipment, automatic arc distributor equipment, central charging equipment installation, signaling network equipment, intelligent network equipment, communication processing equipment installation, private exchange (PBX, CBX) equipment, etc.'
                                },
                                {
                                    label: 'Transmission equipment',
                                    value: 'Transmission terminal office (FLC·PCM·PDH·SDH·DACS·SONET·WDM) installation, transmitter equipment, repeater equipment, multiple equipment, distributor equipment, power line carrier equipment, comprehensive cable television (CATV) transmission equipment, etc.'
                                },
                                {
                                    label: 'Private communication equipment',
                                    value: 'Constructions of private communication line, mobile communications private line, integrated reception system, telephone equipment, security alarm system, broadcasting equipment, information and communication equipment of emergency equipment, vertical and horizontal pipe and wiring equipment, main equipment room installation, total equipment room installation, acoustic telecommunication equipment for the handicapped, Keyphone equipment, etc.'
                                },
                                {
                                    label: 'Mobile communications equipment',
                                    value: 'Constructions of personal communication service (PCS) equipment, cellular mobile telephone (Cellular) equipment, trunked radio system (TRS) equipment, wireless data communications equipment, radio call equipment, IMT-2000 equipment, Global Mobile Personal Communication by Satellite (GMPCS) equipment, city phone equipment, etc.'
                                },
                                {
                                    label: 'Satellite communications equipment',
                                    value: 'Constructions of satellite transmission and reception office equipment, satellite equipment, ground control office equipment, projectile equipment, satellite location system (GPS) equipment, small size satellite earth station (VSAT) equipment, satellite news broadcast (SNG) equipment, etc.'
                                },
                                {
                                    label: 'Fixed wireless communication equipment',
                                    value: 'Constructions of wireless CATV(MMDS·LMDS) equipment, broadcasting communication fusion system (LMCS) equipment, wireless member network (WLL) equipment, microwave (M/W) equipment, wireless outside wire equipment, etc.'
                                },
                                {
                                    label: 'Broadcasting equipment',
                                    value: 'Constructions of sound facilities, transmission equipment, broadcast management system equipment, etc.'
                                },
                                {
                                    label: 'Broadcasting transport / Line facilities',
                                    value: 'Constructions of broadcasting pipe equipment, broadcasting cable (including telephone pole, steel tower, pipe, terminal box, etc.) equipment, transmission terminal equipment, transmission and reception equipment, transmission equipment, multiple equipment, distribution equipment, local transmission line equipment, satellite broadcasting reception equipment, etc.'
                                },
                                {
                                    label: 'Information control / Security equipment',
                                    value: 'Constructions of artificial intelligence building system (IBS) equipement, control (Air, transportation, weather, parking) equipment, remote control, automatic control (including information and communication equipments such as SCADA, TM/TC, and factory automation) equipment, information system management equipment, direction finding equipment, position finder equipment, electric signal control equipment, Closed Circuit Television (CCTV) equipment, security equipment, tunnel group management system (TGMS) equipment, water system integrated automatic control equipment, floodgate control equipment, flood forecast and alert equipment, civil air defense warning equipment, water supply plant control equipment, disaster prevention equipment, water processing (including waterworks and sewage, waste water, etc. ) measurement control equipment, emergency relief system equipment, Telematics equipment, etc.'
                                },
                                {
                                    label: 'Information network equipment',
                                    value: 'Constructions of close range communications network (including ethernet, LAN·ATM-LAN·gigabyte, LAN, etc.) equipment, value added network (VAN) equipment, wide area network (WAN) equipment, information system network management (TMN) equipment, wireless communications network equipment, data processing (including CPU·C/S·control device, etc.) equipment, internet (including intranet, extranet, and firewall) equipment, multimedia equipment, computer, communications integration (CTI) equipment, integrated information communication network (ISDN) equipment, high-speed data network (XDSL: including cable modem, etc.) equipment, point of sales system (POS), ubiquitous equipment, etc.'
                                },
                                {
                                    label: 'Information media equipment',
                                    value: 'Constructions of image (video) conference system equipment, home-banking system equipment, remote medical system equipment, remote educational system equipment, video on demand (VOD) equipment, home automation system equipment, electric display equipment, geograhic intelligence system (GIS) equipment, remote automatic meter-reading (AMR) equipment, home network (digital home) system equipment, simultaneous translation system equipment, urban information system(UIS) equipment, spatial imagery information system (SIIS) equipment, housekeeping system equipment, etc.'
                                },
                                {
                                    label: 'Airline / Harbor communication equipment',
                                    value: 'Constructions of non-directional beacons (NDB) equipment, omnidirectional beacons (VOR) equipment, distance measurement (DME) equipment, instrument landing (ILS) equipment, loran and radar (ASDE·ASR·MSR) equipment, tactics navigation (TACAN) equipment, satellite navigation (CNS/ATM)) equipment, global positioning system (GNSS) equipment, global positioning correction system (GDGPS) equipment, air operations information (FIS) equipment, low altitude gust alert system (LLWAS), noise measurement system, self-use guide (KIOSK) equipment, mobile location management system (MAMS) equipment, integrated information and communication system equipment, general air communications system equipment, communications automation system equipment, integrated security system equipment, coastal wireless (various communications equipment at VTS and coastal area) equipment, etc.'
                                },
                                {
                                    label: 'Ship communication / Sea route / Fishing equipment',
                                    value: 'Constructions of ship communication equipment (GMDSS, ship wreck rescue equipment, transmitter/receiver of MF·HF·VHF·SSB, all-wave receiver, satellite communications gear, SSAS, order device within the ship, etc.), ship navigation equipment (RADAR, weather receiver, GPS, electronic navigation device, RDF, fathometer, NAVTEX, AIS, VDR, anemometer, flux meter, compass, self-steering device, etc.), ship fishing equipment (fishfinder device, fishing net surveillance apparatus, water temperature measurement device, tidal current meter, etc.), etc.'
                                },
                                {
                                    label: 'Railroad communication / Signal equipment',
                                    value: 'Automatic fare collection (AFC) equipment, talk-back equipment, telephone on the rails equipment, train radio equipment, duty officer telephone equipment, automated announcement equipment, electric clock equipment, composite communications equipment, destination guide board equipment, pipe conduit (HP) equipment, trough for communications and signal , automated train stopping device equipment, train centralized control device equipment, electronic signal control equipment'
                                },
                                {
                                    label: 'For information and communications Electric facilities installation',
                                    value: 'Constructions of information and communications electronic supply equipment, electronic anticorrosive equipment, electricity, train inducement prevention equipment, uninterruptible power supplies (UPS) equipment, charging and discharging·voltage control equipment, motor generator equipment, ground equipment, surge equipment, lightening prevention equipment, static and electromagnetic (including EMI·EMC·EMS, etc.) prevention equipment, etc.'
                                }
                            ].map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <th className="bg-white/5 p-5 md:p-6 text-left font-bold text-gentop-green w-1/4 md:w-1/5 border-r border-white/5 uppercase tracking-wider text-[10px] md:text-xs align-top">
                                        {item.label}
                                    </th>
                                    <td className="p-5 md:p-6 text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                                        {item.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
