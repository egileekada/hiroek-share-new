"use client";

import { LabelText } from "../shared";

export default function EventDescription({
    description,
}: {
    description: string;
}) {
    return (
        <div className="w-full flex flex-col font-medium items-center gap-3 px-4 py-4">
            <LabelText>About Event</LabelText>
            {/* <p className="text-sm whitespace-pre-wrap">{description}</p> */}
            <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
}
