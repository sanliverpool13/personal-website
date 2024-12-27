'use client';
import React, { useState } from 'react';
import SectionTitle from '../general/sectiontitle';

const LastClickedButton: React.FC = () => {
    const [lastClicked, setLastClicked] = useState<string | null>(null);

    const handleClick = () => {
        const currentDateTime = new Date().toLocaleString();
        setLastClicked(currentDateTime);
    };

    return (
        <section className="flex flex-col md:gap-20 gap-12">
        <SectionTitle title="Last Clicked" />
            <button className='border-2 rounded-md w-auto' onClick={handleClick}>Click me</button>
            {lastClicked && <p>Last clicked: {lastClicked}</p>}
        </section>
    );
};

export default LastClickedButton;