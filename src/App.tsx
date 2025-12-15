import './App.css';
import { Addressable, BrowserProvider, Contract, Eip1193Provider, parseUnits} from "ethers";
import { WagmiProvider} from "wagmi";
import { createAppKit } from '@reown/appkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiAdapter} from './config';
import { generalConfig } from './config/appConfig';
import { queryClient } from './config/appConfig';
import { WalletConnection } from './components/WalletConnection';
import { DashBoard } from './components/Dashboard';
import { BalanceDisplay } from './components/BalanceDisplay';


const GOV_TOKEN_ADDRESS = import.meta.env.VITE_GOV_TOKEN_ADDR;


createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig
})


export function AppKitProvider({children}: {children: React.ReactNode}){
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function App() {

  // move to helpers folder
  const sendTokens = async (
    tokenAddress: string | Addressable, 
    to: string | Addressable, 
    amount: number, 
    decimals: number = 12) => 
  {
    const browserProvider = window.ethereum;
    if (!browserProvider){
      const msg = "No browser provider detected!";
      console.error(msg);
      alert(msg);
      return
    }
    // unknown in TypeScript is a “safe middleman” type. we can cast anything to unknown, 
    // and then cast unknown to any other type.
    // usually provider is created inside every function. not globally
    const provider = new BrowserProvider(browserProvider as unknown as Eip1193Provider);

    const signer = await provider.getSigner();

    // add step to read decimals from contact. 
    const govTokenContract = new Contract(tokenAddress, GOV_TOKEN_ABI, signer);

    const tx = await govTokenContract.transfer(to, parseUnits(amount.toString(), decimals))

    // user will loose data if page reloaded or network jump happened
    // during tx.wait()
    // better to use events.
    // ideally - add listener. vait for block. compare tx.hash from signer with tx.hash
    // for each tx in new block - then remove listener (no need to use grpc provider resources without needs)
    const receipt = await tx.wait();

    console.log("tx status: ", receipt)

    return receipt
  }

  const sendGovTokens = () => {
    return sendTokens(
      GOV_TOKEN_ADDRESS,
      "0xbbf0573660fd1231a51a2972c17888fd53a7ef06",
      1000
    )
  }
  // all wallet interactions ideally should be done in header
  return (
    <div className={"app-container"}>
      {/*dashboard and wallet connection is exchanging info
      because they are inside global component AppKitProvider
      */}
      <AppKitProvider>
        <>
          <WalletConnection/>
          <DashBoard/>
          <BalanceDisplay/>
          {/*<button onClick={connect}>Connect wallet</button>*/}
          {/*<p>{account}</p>*/}
          {/*<p>{network ?? "-"}</p>*/}
          <button onClick={sendGovTokens}>Send Gov Tokens</button>
        </>
      </AppKitProvider>
    </div>
  )
}

export default App


/* // connect to browser provider with pure ethers
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<number | null>(null);

  const connect = async () => {
    // check if user has metamask or any other browser provider
    if (!window.ethereum){
      const msg = "No browser provider detected!";
      console.error(msg);
      alert(msg);
    }

    try{
      const provider = new BrowserProvider(window.ethereum);

      // requestAccounts performs connection to wallet
      // when accounts only returns list of available accounts
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const walletNetwork = await provider.getNetwork();
      setNetwork(Number(walletNetwork.chainId));

      console.log("connected", {
        account: account,
        networkId: network,
      })

    } catch(e) {
      console.error(e);
    }

  } 
*/
