import { useAppKitAccount } from "@reown/appkit/react";
import { useChainId, useConfig } from "wagmi";
import { SwitchNetworkButton } from "./SwitchToHoodi";


export function DashBoard(){
    const { address, status } = useAppKitAccount();

    const chainId = useChainId();
    const config = useConfig();

    const currentChain =  config.chains.find(c => c.id === chainId);

    return(
        <section>
            
            <h2>Dashboard</h2>

            {
            chainId !== 560048 ? (
                <p>WRONG NETWORK... CHANGE TO HOODI USING BUTTON! <SwitchNetworkButton/> </p>
            ) : (                
                <pre>
                Address: {address}<br/>
                Status: {status}<br/>
                ChainId: {currentChain?.id ?? "-"}<br/>
                ChainName: {currentChain?.name ?? "-"}<br/>
                </pre>
            )
            }

        </section>
    );
}