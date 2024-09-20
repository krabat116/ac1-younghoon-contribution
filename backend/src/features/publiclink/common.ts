export function constructPublicLink(publicLinkId:string) : string {
    const BASE_URL = 'https://memory.app/'
    return BASE_URL + publicLinkId;
  }