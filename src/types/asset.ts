export interface Asset {
  id: string;
  endpoint: string;
  stats: {
    discoveredPortsCount: number;
    // unix timestamp
    lastDiscovery: number;
    highestVulnerabilitySeverity: VulnerabilitySeverity | null;
  };
}

export type AssetDiscoveryProtocol = "tcp" | "udp";
export type AssetFindingType = "port" | "vulnerability";

export interface AssetFinding<T extends object> {
  id: string;
  assetId: string;
  type: AssetFindingType;
  // unix timestamp
  createdAt: number;
  findingHash: string;
  agentId: string;
  data: T;
}

export interface AssetPortFindingData {
  port: number;
  protocol: AssetDiscoveryProtocol;
}

export function getPortFindings(
  findings: Array<AssetFinding<any>>
): Array<AssetFinding<AssetPortFindingData>> {
  const portFindings = findings.filter((f) => f.type === "port");
  return portFindings as Array<AssetFinding<AssetPortFindingData>>;
}

export enum VulnerabilitySeverity {
  Info = "info",
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export interface AssetNucleiFindingData {
  // template is the relative filename for the template
  template?: string;
  // template-url is the URL of the template for the result inside the nuclei
  // templates repository if it belongs to the repository
  "template-url"?: string;
  // template-id is the ID of the template for the result
  "template-id": string;
  // template-path is the path of template
  "template-path"?: string;
  // template-encoded is the base64 encoded template
  "template-encoded"?: string;
  // info contains information block of the template for the result
  info: {
    name: string;
    author: Array<string>;
    tags: Array<string>;
    description: string;
    impact?: string;
    reference?: Array<string>;
    severity?: VulnerabilitySeverity;
    remediation?: string;
    classification?: {
      "cve-id"?: string;
      "cwe-id"?: Array<string>;
      cpe?: string;
      "cvss-metrics"?: string;
      "cvss-score"?: number;
      "epss-score"?: number;
      "epss-percentile"?: number;
    };
  };
  // matcher-name is the name of the matcher matched if any
  "matcher-name"?: string;
  // extractor-name is the name of the extractor matched if any
  "extractor-name"?: string;
  // type is the type of the result event
  type: string;
  // host is the host input on which match was found.
  host?: string;
  // port is port of the host input on which match was found (if applicable).
  port?: string;
  // scheme is the scheme of the host input on which match was found (if applicable)
  scheme: string;
  // url is the Base URL of the host input on which match was found (if applicable).
  url?: string;
  // path is the path input on which match was found
  path: string;
  // matched-at contains the matched input in its transformed form
  "matched-at"?: string;
  // extracted-results contains the extraction result from the inputs
  "extracted-results"?: Array<string>;
  // request is the optional, dumped request for the match
  request?: string;
  // response is the optional, dumped response for the match
  response?: string;
  // meta contains any optional metadata for the event
  meta: object;
  // ip is the IP address for the found result event
  ip?: string;
  // timestamp is the time the result was found at
  timestamp: string;
  // curl-command is an optional curl command to reproduce the request.
  // Only applicable if the report is for HTTP
  "curl-command"?: string;
  // matcher-status is the status of the match
  "matcher-status": string;
  // lines is the line count for the specified match
  lines?: Array<number>;
  // global-matchers dentifies whether the matches was detected in the response
  // of another template's result event
  "global-matchers"?: boolean;
}

export function getVulnerabilityFindings(
  findings: Array<AssetFinding<any>>,
  latest: boolean = false
): Array<AssetFinding<AssetNucleiFindingData>> {
  const vulnFindings = findings.filter((f) => f.type === "vulnerability");

  if (latest) {
    const mapped: Map<string, AssetFinding<AssetNucleiFindingData>> = new Map();
    for (const finding of vulnFindings) {
      if (mapped.has(finding.findingHash)) {
        const current = mapped.get(finding.findingHash);
        if (current!.createdAt < finding.createdAt) {
          mapped.set(finding.findingHash, finding);
        }
      }
      mapped.set(finding.findingHash, finding);
    }
    return Array.from(mapped.values());
  }

  return vulnFindings as Array<AssetFinding<AssetNucleiFindingData>>;
}

export interface AssetHistoryEntry {
  id: string;
  assetId: string;
  timestamp: number;
  userId: string;
  eventType: string;
  eventData: object | null;
}
