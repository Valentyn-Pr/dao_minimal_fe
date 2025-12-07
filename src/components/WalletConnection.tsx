import { useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "@reown/appkit/react";
import { WalletAvatar } from "./Avatar";


export function WalletConnection() {
  const { address, isConnected } = useAppKitAccount();  
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
                      
      {isConnected && (
          <WalletAvatar address={address as string}/>
      )}

      <appkit-button />
      {isConnected && (
                <div>
                    <button onClick={handleDisconnect}>Disconnect wallet</button>
                </div>
            )}

    </div>
  );
}
