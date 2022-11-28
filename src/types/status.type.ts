export type Status = {
  services: { github: number; opengraph: number };
  message: string;
  code: number;
};

export type Services = {
  services: {
    github: number;
    opengraph: number;
  };
};

export default Status;
