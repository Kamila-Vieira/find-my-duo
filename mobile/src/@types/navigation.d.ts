interface UserAccessProps {
  avatar: string;
  discord: string;
  accessToken: string;
}

export interface GameParams extends UserAccessProps {
  id: string;
  title: string;
  bannerUrl: string;
}

export interface HomeParams extends UserAccessProps {}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      auth: undefined;
      home: HomeParams;
      game: GameParams;
    }
  }
}
