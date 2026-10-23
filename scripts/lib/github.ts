/**
 * GitHub API utilities for skill import and sync scripts.
 */

const GITHUB_API = "https://api.github.com";
const USER_AGENT = "SkillsHub-Importer";

export interface GitHubRepository {
  name: string;
  owner: { login: string };
  description: string | null;
  stargazers_count: number;
  fork: boolean;
  license: { spdx_id: string | null } | null;
}

interface DirectoryEntry {
  name: string;
}

interface CodeSearchItem {
  repository: { owner: { login: string }; name: string };
  path: string;
}

interface RepositorySearchItem {
  owner: { login: string };
  name: string;
}

function getHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": USER_AGENT,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

function getRawHeaders(token?: string): Record<string, string> {
  return {
    ...getHeaders(token),
    Accept: "application/vnd.github.v3.raw",
  };
}

export async function fetchGitHubFile(
  owner: string,
  repo: string,
  filePath: string,
  token?: string
): Promise<string | null> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  try {
    const response = await fetch(url, { headers: getRawHeaders(token) });
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // Ignore errors
  }
  return null;
}

export async function fetchRepoInfo(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubRepository | null> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}`;
  try {
    const response = await fetch(url, { headers: getHeaders(token) });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Ignore errors
  }
  return null;
}

export async function listDirectory(
  owner: string,
  repo: string,
  dirPath: string = "",
  token?: string
): Promise<string[]> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${dirPath}`;
  try {
    const response = await fetch(url, { headers: getHeaders(token) });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return (data as DirectoryEntry[]).map((item) => item.name);
      }
    }
  } catch {
    // Ignore errors
  }
  return [];
}

export interface SearchResult {
  owner: string;
  repo: string;
  path: string;
}

export async function searchCode(
  query: string,
  token?: string,
  page: number = 1,
  perPage: number = 100
): Promise<{ items: SearchResult[]; total: number }> {
  const url = `${GITHUB_API}/search/code?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(url, { headers: getHeaders(token) });
    if (response.ok) {
      const data = await response.json();
      const items: SearchResult[] = ((data.items || []) as CodeSearchItem[]).map((item) => ({
        owner: item.repository.owner.login,
        repo: item.repository.name,
        path: item.path,
      }));
      return { items, total: data.total_count || 0 };
    }
    if (response.status === 403 || response.status === 429) {
      console.log(`  ⏳ Rate limited, waiting 60s...`);
      await sleep(60000);
      return searchCode(query, token, page, perPage);
    }
  } catch {
    // Ignore errors
  }
  return { items: [], total: 0 };
}

export async function searchRepos(
  query: string,
  token?: string,
  page: number = 1,
  perPage: number = 100
): Promise<{ items: SearchResult[]; total: number }> {
  const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=stars&order=desc`;
  try {
    const response = await fetch(url, { headers: getHeaders(token) });
    if (response.ok) {
      const data = await response.json();
      const items: SearchResult[] = ((data.items || []) as RepositorySearchItem[]).map((item) => ({
        owner: item.owner.login,
        repo: item.name,
        path: "",
      }));
      return { items, total: data.total_count || 0 };
    }
    if (response.status === 403 || response.status === 429) {
      console.log(`  ⏳ Rate limited, waiting 60s...`);
      await sleep(60000);
      return searchRepos(query, token, page, perPage);
    }
  } catch {
    // Ignore errors
  }
  return { items: [], total: 0 };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchStarredRepos(
  username: string,
  token?: string,
  page: number = 1,
  perPage: number = 100
): Promise<SearchResult[]> {
  const url = `${GITHUB_API}/users/${username}/starred?page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(url, { headers: getHeaders(token) });
    if (response.ok) {
      const data = await response.json();
      return ((data || []) as RepositorySearchItem[]).map((item) => ({
        owner: item.owner.login,
        repo: item.name,
        path: "",
      }));
    }
    if (response.status === 403 || response.status === 429) {
      console.log(`  ⏳ Rate limited, waiting 60s...`);
      await sleep(60000);
      return fetchStarredRepos(username, token, page, perPage);
    }
  } catch {
    // Ignore errors
  }
  return [];
}

export async function fetchRepoStats(
  owner: string,
  repo: string,
  token?: string
): Promise<{ contributorCount: number; commitFrequency: string }> {
  const headers = getHeaders(token);
  let contributorCount = 0;
  let commitFrequency = "inactive";

  try {
    const contribUrl = `${GITHUB_API}/repos/${owner}/${repo}/contributors?per_page=1&anon=true`;
    const contribRes = await fetch(contribUrl, { headers });
    if (contribRes.ok) {
      // GitHub returns total count in Link header
      const linkHeader = contribRes.headers.get("Link");
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (match) contributorCount = parseInt(match[1], 10);
      } else {
        const data = await contribRes.json();
        contributorCount = Array.isArray(data) ? data.length : 0;
      }
    }
  } catch {
    // Ignore
  }

  try {
    const commitUrl = `${GITHUB_API}/repos/${owner}/${repo}/stats/commit_activity`;
    const commitRes = await fetch(commitUrl, { headers });
    if (commitRes.ok) {
      const data = await commitRes.json();
      if (Array.isArray(data) && data.length > 0) {
        // Last 4 weeks of commit activity
        const recentWeeks = data.slice(-4) as { total?: number }[];
        const totalCommits = recentWeeks.reduce((sum, week) => sum + (week.total || 0), 0);
        if (totalCommits >= 20) commitFrequency = "daily";
        else if (totalCommits >= 5) commitFrequency = "weekly";
        else if (totalCommits >= 1) commitFrequency = "monthly";
        else commitFrequency = "inactive";
      }
    }
  } catch {
    // Ignore
  }

  return { contributorCount, commitFrequency };
}
