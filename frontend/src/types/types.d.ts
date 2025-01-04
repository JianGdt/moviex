declare namespace ComponentProps {
    export type Movie = {
        id: number;
        title?: string;
        name?: string;
        overview: string;
        release_date: string;
        poster_path: string;
        backdrop_path: string;
      };
    
      export type MovieSliderProps = {
        category: string;
      };

      export type ContentStoreState = {
        contentType: string;
        setContentType: (type: string) => void;
      }
      
      export type User = {
        _id: string;
        username: string;
        email: string;
        password: string;
        image: string;
        searchHistory: string[];
        __v: number;
      };
      
      export type LoginCredentials = {
        email: string;
        password: string;
      };
      
      export type SignupCredentials = {
        email: string;
        username: string;
        password: string;
      };

      export type Credentials = LoginCredentials | SignupCredentials;
      
      export type AuthStoreState = {
        user: User | null;
        isSigningUp: boolean;
        isCheckingAuth: boolean;
        isLoggingOut: boolean;
        isLoggingIn: boolean;
        signup: (credentials: SignupCredentials) => Promise<void>;
        login: (credentials: LoginCredentials) => Promise<void>;
        logout: () => Promise<void>;
        authCheck: () => Promise<void>;
      };

      export type TrendingContent = {
        id: number;
        title?: string;
        name?: string;
        overview: string;
        release_date?: string;
        first_air_date?: string;
        adult?: boolean;
        backdrop_path: string;
      };

      export type Result = {
        id: number;
        title?: string;
        name?: string;
        poster_path?: string;
        profile_path?: string;
      };

      export type SearchHistoryEntry ={
        id: string;
        title: string;
        image: string;
        createdAt: string;
        searchType: "movie" | "tv" | "person";
      }

     export type Content = {
        id: number;
        title?: string;
        name?: string;
        release_date?: string | undefined;
        first_air_date?: string;
        adult?: boolean;
        overview?: string;
        poster_path?: string;
      };
      
    export type Trailer = {
        key: string;
      };
      
    export type SimilarContent = {
        id: number;
        title?: string;
        name?: string;
        poster_path?: string | null;
      };
}