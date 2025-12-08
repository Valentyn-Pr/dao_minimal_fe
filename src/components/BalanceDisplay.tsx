import { useAccount, useBalance } from "wagmi"
import { Address } from "viem";
import { BigNumberish, formatUnits } from "ethers";
import { CONTRACT_ADDRESSES, CONTRACTS } from "../contracts";

export function BalanceDisplay(){
    const { address} = useAccount();
    // move calls to higher level

    // Native token ballance:
    const { data: nativeBalance } = useBalance({address: address as Address});
    let formattedNativeBalance = "---";
    let nativeTokensymbol = "---";
    
    if (!nativeBalance){
        console.log("can not fetch native balance")
    } else {
        formattedNativeBalance = parseFloat(formatUnits(
            nativeBalance?.value as BigNumberish, 
            nativeBalance?.decimals as BigNumberish,
        )).toFixed(3).toString();
        nativeTokensymbol = nativeBalance.symbol;
    }

    // GOV token balance:
    const {data: govTokenBalance } = useBalance({
        address: address as Address,
        token: CONTRACT_ADDRESSES[CONTRACTS.GOV_TOKEN] as `0x${string}`,
    });
    let formattedGovTokenBalance = "---";
    let govTokenSymbol = "---"

    if (!govTokenBalance){
        console.log("can not fetch got token balance")
    } else{
        formattedGovTokenBalance = parseFloat(formatUnits(
            govTokenBalance?.value as BigNumberish, 
            govTokenBalance?.decimals as BigNumberish,
        )).toFixed(3).toString();
        govTokenSymbol = govTokenBalance.symbol;
    }
    

    return (
        <table style={{ textAlign: "left" }}>
            <caption>Token Balances</caption>
            <thead>
            <tr>
                <th>Token Name</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Native token</td>
                <td>{formattedNativeBalance} {nativeTokensymbol}</td>
            </tr>
            <tr>
                <td>Gov token</td>
                <td>{formattedGovTokenBalance} {govTokenSymbol}</td>
            </tr>

            </tbody>    
        </table>
    )
}