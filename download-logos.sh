#!/bin/bash
# Run once: downloads all integration logos to landing/logos/
# Usage: cd landing && bash download-logos.sh

set -e
mkdir -p logos

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

fetch() {
  local name=$1 url=$2
  echo -n "  $name ... "
  if curl -sf -L -A "$UA" "$url" -o "logos/${name}.png" 2>/dev/null; then
    echo "✓"
  else
    echo "✗ (fallback will show)"
  fi
}

echo "Downloading logos..."
fetch salesforce  "https://logo.clearbit.com/salesforce.com?size=64"
fetch hubspot     "https://logo.clearbit.com/hubspot.com?size=64"
fetch stripe      "https://logo.clearbit.com/stripe.com?size=64"
fetch snowflake   "https://logo.clearbit.com/snowflake.com?size=64"
fetch google      "https://logo.clearbit.com/google.com?size=64"
fetch postgresql  "https://logo.clearbit.com/postgresql.org?size=64"
fetch zendesk     "https://logo.clearbit.com/zendesk.com?size=64"
fetch slack       "https://logo.clearbit.com/slack.com?size=64"
fetch mongodb     "https://logo.clearbit.com/mongodb.com?size=64"
fetch airtable    "https://logo.clearbit.com/airtable.com?size=64"
fetch notion      "https://logo.clearbit.com/notion.so?size=64"
fetch microsoft   "https://logo.clearbit.com/microsoft.com?size=64"
fetch mixpanel    "https://logo.clearbit.com/mixpanel.com?size=64"
fetch amplitude   "https://logo.clearbit.com/amplitude.com?size=64"
fetch intercom    "https://logo.clearbit.com/intercom.com?size=64"
fetch shopify     "https://logo.clearbit.com/shopify.com?size=64"
fetch databricks  "https://logo.clearbit.com/databricks.com?size=64"
fetch twilio      "https://logo.clearbit.com/twilio.com?size=64"
fetch github      "https://logo.clearbit.com/github.com?size=64"
fetch atlassian   "https://logo.clearbit.com/atlassian.com?size=64"
fetch mysql       "https://logo.clearbit.com/mysql.com?size=64"
fetch asana       "https://logo.clearbit.com/asana.com?size=64"
fetch zapier      "https://logo.clearbit.com/zapier.com?size=64"
fetch segment     "https://logo.clearbit.com/segment.com?size=64"
fetch linkedin    "https://logo.clearbit.com/linkedin.com?size=64"
fetch pipedrive   "https://logo.clearbit.com/pipedrive.com?size=64"
fetch zoom        "https://logo.clearbit.com/zoom.us?size=64"
fetch dropbox     "https://logo.clearbit.com/dropbox.com?size=64"
fetch oracle      "https://logo.clearbit.com/oracle.com?size=64"
fetch looker      "https://logo.clearbit.com/looker.com?size=64"
fetch tableau     "https://logo.clearbit.com/tableau.com?size=64"
fetch sap         "https://logo.clearbit.com/sap.com?size=64"
fetch workday     "https://logo.clearbit.com/workday.com?size=64"
fetch gusto       "https://logo.clearbit.com/gusto.com?size=64"
fetch bamboohr    "https://logo.clearbit.com/bamboohr.com?size=64"
fetch okta        "https://logo.clearbit.com/okta.com?size=64"
fetch docusign    "https://logo.clearbit.com/docusign.com?size=64"
fetch freshdesk   "https://logo.clearbit.com/freshdesk.com?size=64"
fetch greenhouse  "https://logo.clearbit.com/greenhouse.io?size=64"
fetch marketo     "https://logo.clearbit.com/marketo.com?size=64"
fetch box         "https://logo.clearbit.com/box.com?size=64"
fetch facebook    "https://logo.clearbit.com/facebook.com?size=64"
fetch intuit      "https://logo.clearbit.com/intuit.com?size=64"
fetch getdbt      "https://logo.clearbit.com/getdbt.com?size=64"
fetch lever       "https://logo.clearbit.com/lever.co?size=64"
fetch coupa       "https://logo.clearbit.com/coupa.com?size=64"
fetch netsuite    "https://logo.clearbit.com/netsuite.com?size=64"

echo ""
echo "Done. $(ls logos/*.png 2>/dev/null | wc -l | tr -d ' ') logos saved to landing/logos/"
echo "Commit the logos/ folder to GitHub and they'll be served locally."
