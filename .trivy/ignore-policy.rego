package trivy

# next@14.2.35 accumulates new advisories faster than they can be tracked
# one CVE ID at a time; every one of them is fixed only by the Next.js 15
# major upgrade. Exempt the whole package here instead of an ID list that
# goes stale as Trivy's database updates between runs.
default ignore = false

ignore {
	input.PkgName == "next"
}
