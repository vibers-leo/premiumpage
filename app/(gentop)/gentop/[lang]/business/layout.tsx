import React from 'react';

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Clean layout without legacy CSS interference */}
            {children}
        </>
    );
}
