"use client";

import React from "react";

interface SmsShareButtonProps {
    phone: string;
    projectTitle: string;
    projectUrl: string;
}

export default function SmsShareButton({
    phone,
    projectTitle,
    projectUrl,
}: SmsShareButtonProps) {
    const handleSmsShare = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Check if it's iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const separator = isIOS ? "&" : "?";

        const body = `[An_DesignECO] ${projectTitle} 시공사례\n상세보기: ${projectUrl}\n비슷한 느낌 원하시면 이 링크 보고 연락 주세요.`;
        const smsHref = `sms:${phone}${separator}body=${encodeURIComponent(body)}`;

        // Update the href dynamically to ensure correct separator
        e.currentTarget.href = smsHref;
    };

    return (
        <a
            href="#"
            onClick={handleSmsShare}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.75rem 1.5rem",
                backgroundColor: "var(--accent)",
                color: "var(--foreground)",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "0.9375rem",
                flex: 1,
                textAlign: "center",
                border: "1px solid var(--border)",
            }}
        >
            문자로 공유
        </a>
    );
}
