import React from 'react'
import Loadable from '@loadable/component'
import { WhyTrade } from '../sections/_why-trade'
import AvailableTrades from '../helper/_available-trades'
import { forex_content, forex_content_eu } from '../../static/content/_forex'
import { forex_cfds, forex_cfds_eu } from '../../static/content/_cfds'
import { forex_multiplier, forex_multiplier_eu } from '../../static/content/_multipliers'
import { forex_options } from '../../static/content/_digital-options'
import CFDs from '../sub-markets/_cfds'
import Multipliers from '../sub-markets/_multipliers'
import DigitalOptions from '../sub-markets/_digital-options'
import { StyledBox } from '../../static/style/_markets-style'
import { SimpleStepContentElement } from '../../static/content/_simple_step_content'
import useRegion from 'components/hooks/use-region'
import { Localize, localize } from 'components/localization'

//Lazy-load
const SimpleSteps = Loadable(() => import('components/custom/_simple-steps'))
const OtherMarkets = Loadable(() => import('../sections/_other-markets'))

type ForexProps = {
    simple_step_content: SimpleStepContentElement[]
}
const Forex = ({ simple_step_content }: ForexProps) => {
    const { is_row, is_eu } = useRegion()
    return (
        <>
            <WhyTrade header={<Localize translate_text="Why trade forex on Deriv" />}>
                {(is_eu ? forex_content_eu : forex_content).map((content, index) => (
                    <StyledBox
                        key={index}
                        text={content.text}
                        icon={<img src={content.src} alt={content.alt} />}
                    />
                ))}
            </WhyTrade>
            <AvailableTrades
                CFDs={<CFDs market_content={is_eu ? forex_cfds_eu : forex_cfds} />}
                DigitalOptions={
                    is_row && (
                        <DigitalOptions
                            market_name={localize('forex')}
                            options_list={forex_options}
                        />
                    )
                }
                Multipliers={
                    <Multipliers market_content={is_eu ? forex_multiplier_eu : forex_multiplier} />
                }
                // name="Forex"
                display_title={<Localize translate_text="Forex trades available on Deriv" />}
            />
            <SimpleSteps
                header={
                    <Localize translate_text="Start trading forex on Deriv in 3 simple steps" />
                }
                content={simple_step_content}
                sign_up
            />
            <OtherMarkets except="forex" />
        </>
    )
}

export default Forex
