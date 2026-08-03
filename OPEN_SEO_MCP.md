# Connect OpenSEO MCP for Unity ERP SEO

Hosted MCP URL:

```
https://app.openseo.so/mcp
```

## Cursor
1. Settings → Tools & Integrations → MCP Tools → New MCP Server  
2. Or use project file `.cursor/mcp.json` (already added)  
3. Approve OpenSEO login when prompted  
4. In OpenSEO app: connect Google Search Console for `unity-software.online`

## Claude Code
```bash
claude mcp add --transport http --scope user openseo https://app.openseo.so/mcp
```

## Claude Desktop
Settings → Connectors → Add custom connector → paste `https://app.openseo.so/mcp`

## Codex CLI
```bash
codex mcp add openseo --url https://app.openseo.so/mcp
```

After connect you can research keywords, SERPs, backlinks, and GSC data for Unity ERP ranking work.
