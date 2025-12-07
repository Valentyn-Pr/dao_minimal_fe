import { useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "@reown/appkit/react";

export function WalletConnection() {
  const { isConnected } = useAppKitAccount();  
  const { disconnect } = useDisconnect();

    const handleDisconnect = async () =>{
        try{
            await disconnect();
        } catch(e) {
            console.error(e);
        }
    }
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <appkit-button />
      {isConnected && (
                <div>
                    <button onClick={handleDisconnect}>Disconnect wallet</button>
                </div>
            )}

    </div>
  );
}
