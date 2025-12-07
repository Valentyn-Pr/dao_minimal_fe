import { Addressable } from 'ethers';
// I do not want to write module declaration for react-blockies module
// @ts-ignore
import Blockies from 'react-blockies';

export function WalletAvatar({ address }: { address: string | Addressable}) {
  return (
    <Blockies
      seed={address}
      size={10}
      scale={5}
    />
  );
}
