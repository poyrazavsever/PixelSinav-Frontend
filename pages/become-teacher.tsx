import React from 'react';
import Head from 'next/head';
import AdvantagesSection from '@/components/teacher/advantages-section';
import RequirementsSection from '@/components/teacher/requirements-section';
import ProcessSection from '@/components/teacher/process-section';
import ApplicationForm from '@/components/teacher/application-form';

const BecomeTeacher = () => {
    return (
        <>
            <Head>
                <title>Öğretmen Ol | PixelSınav</title>
            </Head>

            <main>
                <AdvantagesSection />
                <RequirementsSection />
                <ProcessSection />
                <ApplicationForm />
            </main>
        </>
    );
};

export default BecomeTeacher;