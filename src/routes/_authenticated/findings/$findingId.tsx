import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { AssetNucleiFindingData } from "@/types/asset";
import { getFinding } from "@/api/findings";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityBadge } from "@/components/SeverityBadge";
import { DateField } from "@/components/DateField";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/findings/$findingId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { findingId } = useParams({ strict: false });

  const findingQuery = useQuery({
    queryKey: ["finding", findingId],
    queryFn: ({ queryKey }) => getFinding(queryKey[1] as string),
  });

  if (findingQuery.isLoading) {
    return <LoadingIndicator text="Loading finding details..." />;
  }

  if (findingQuery.isError || !findingQuery.data) {
    return (
      <div className="p-4 text-red-500">Error loading finding details</div>
    );
  }

  const finding = findingQuery.data;
  const data = finding.data as AssetNucleiFindingData;
  const info = data.info;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{info.name}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Found on <DateField dateUnix={finding.createdAt} />
            </span>
            <span>•</span>
            <span>{data.host}</span>
          </div>
        </div>
        {info.severity && <SeverityBadge severity={info.severity} />}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {info.classification?.["cve-id"] && (
                <div>
                  <div className="font-semibold mb-1">CVE ID</div>
                  <div>{info.classification["cve-id"]}</div>
                </div>
              )}
              {info.classification?.["cvss-score"] && (
                <div>
                  <div className="font-semibold mb-1">CVSS Score</div>
                  <Badge variant="outline">
                    {info.classification["cvss-score"]}
                  </Badge>
                </div>
              )}
              {info.classification?.["epss-score"] && (
                <div>
                  <div className="font-semibold mb-1">EPSS Score</div>
                  <Badge variant="outline">
                    {info.classification["epss-score"]}
                  </Badge>
                </div>
              )}
              {info.classification?.cpe && (
                <div>
                  <div className="font-semibold mb-1">CPE</div>
                  <div className="font-mono text-sm">
                    {info.classification.cpe}
                  </div>
                </div>
              )}
            </div>
            {info.tags.length > 0 && (
              <div>
                <div className="font-semibold mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {info.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-semibold mb-1">Template ID</div>
              <div className="font-mono text-sm">{data["template-id"]}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Matcher Name</div>
              <div>{data["matcher-name"] || "-"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Type</div>
              <div className="capitalize">{data.type}</div>
            </div>
            {data["matched-at"] && (
              <div>
                <div className="font-semibold mb-1">Matched At</div>
                <div className="font-mono text-sm break-all">
                  {data["matched-at"]}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{info.description}</p>
          {info.impact && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Impact</h4>
              <p>{info.impact}</p>
            </div>
          )}
          {info.remediation && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Remediation</h4>
              <p>{info.remediation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {(data.request || data.response) && (
        <Card>
          <CardHeader>
            <CardTitle>Evidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data["curl-command"] && (
              <div>
                <h4 className="font-semibold mb-2">Curl Command</h4>
                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm font-mono">
                    {data["curl-command"]}
                  </pre>
                </div>
              </div>
            )}
            {data.request && (
              <div>
                <h4 className="font-semibold mb-2">Request</h4>
                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm font-mono">{data.request}</pre>
                </div>
              </div>
            )}
            {data.response && (
              <div>
                <h4 className="font-semibold mb-2">Response</h4>
                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm font-mono">{data.response}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
