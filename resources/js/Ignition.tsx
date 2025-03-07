import React from 'react';
import InViewContextProvider from 'contexts/InViewContextProvider';
import NavBar from 'components/NavBar';
import Section from 'components/Section';
import { IgniteDataContext } from 'contexts/IgniteDataContext';
import {
    ErrorOccurrence,
    StackTrace,
    Context,
    Debug,
    ErrorOccurrenceContext,
    ErrorCard,
    IgnitionConfigContextProvider,
    hasDebugInfo,
} from '@flareapp/ignition-ui';
import { IgniteData } from './types';
import { useInView } from 'react-intersection-observer';
import AppDebugWarning from 'components/AppDebugWarning';

type Props = {
    errorOccurrence: ErrorOccurrence;
    igniteData: IgniteData;
};

export default function Ignition({ errorOccurrence, igniteData }: Props) {
    const { ref: intersectionRef, inView: errorCardInView } = useInView({
        rootMargin: '-40px 0px 0px 0px',
        threshold: 0.3,
        initialInView: true,
    });

    return (
        <IgniteDataContext.Provider value={igniteData}>
            <IgnitionConfigContextProvider ignitionConfig={igniteData.config}>
                <ErrorOccurrenceContext.Provider value={errorOccurrence}>
                    <InViewContextProvider>
                        <NavBar showException={!errorCardInView} />
                        <main className="mx-auto my-20 px-6 lg:px-10 max-w-4xl lg:max-w-[90rem] grid grid-cols-1 gap-10">
                            
                            <AppDebugWarning />

                            <div ref={intersectionRef}>
                                <ErrorCard />
                            </div>

                            <Section name="stack" children={<StackTrace />} />

                            <Section name="context" children={<Context />} />

                            {hasDebugInfo(errorOccurrence) && <Section name="debug" children={<Debug />} />}
                        </main>
                    </InViewContextProvider>
                </ErrorOccurrenceContext.Provider>
            </IgnitionConfigContextProvider>
        </IgniteDataContext.Provider>
    );
}
