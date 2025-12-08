import { AppKitNetwork } from "@reown/appkit/networks";
import { mainnet } from "viem/chains";
import { hoodi } from "./customNetworks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"

// 0. reown projectId from .env
export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;
if (!projectId){
  console.error("reown project id missed")
}

// 2. metadata
export const metadata = {
  name: 'AppKit',
  description: 'Example',
  url: 'https://reown.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. networks that we plan to use
export const networks = [mainnet ,hoodi] as [AppKitNetwork, ...AppKitNetwork[]];

// 4. create WagmiAdapter. pass to adapter projectId та networks
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})
