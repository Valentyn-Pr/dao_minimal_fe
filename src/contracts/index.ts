import GovTokenAbi from './abis/erc20_gov_token.json';
import DaoAbi from './abis/dao.json';

export enum CONTRACTS {
    DAO,
    GOV_TOKEN,
}

export const CONTRACT_ADDRESSES = {
    [CONTRACTS.DAO]: import.meta.env.VITE_DAO_ADDR,
    [CONTRACTS.GOV_TOKEN]: import.meta.env.VITE_GOV_TOKEN_ADDR,
}

export const CONTRACT_ABIS = {
    [CONTRACTS.DAO]: DaoAbi,
    [CONTRACTS.GOV_TOKEN]: GovTokenAbi,
}

export function getContractInfo(name: keyof typeof CONTRACTS){
    return {
        address: CONTRACT_ADDRESSES[name],
        abi: CONTRACT_ABIS[name],
    }
}
