import { useAccount, useSwitchChain } from "wagmi";

export function SwitchNetworkButton() {
    const { chainId, isConnected } = useAccount();
    const { switchChain, isPending } = useSwitchChain();
    const alreadyOnHoodi = chainId == 560048;

    return (
            <button
                onClick={() => switchChain({ chainId: 560048 })}
                disabled={!isConnected || isPending || alreadyOnHoodi}
                style={{ display: "block", margin: "8px 0" }}
            >
                Switch to Hoodi
            </button>
    );
}
