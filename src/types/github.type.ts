import { OctokitResponse, RequestError, Endpoints } from "@octokit/types";

export type ResponseWithError<T> = OctokitResponse<T, number> | RequestError;

export type Limits = Endpoints["GET /rate_limit"]["response"]["data"];
export type Repositories =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];
export type User = Endpoints["GET /users/{username}"]["response"]["data"];
export type Languages =
  Endpoints["GET /repos/{owner}/{repo}/languages"]["response"]["data"];
