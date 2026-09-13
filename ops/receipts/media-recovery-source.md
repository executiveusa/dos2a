# Media recovery source receipt

- Baseline production commit: `7c6c144ee0b85882482e438bd2686b2d4433e843`
- Source: owner-supplied `DOSA audio(1).pptx`
- Recovery rule: PowerPoint-reencoded media is treated as recovered presentation media, not byte-identical proof of the original Stage 02 archive hashes.
- Target: replace expired Fal media rewrites with repository-owned optimized WebP files.
- Rollback: revert the eventual squash merge or restore the previous READY Vercel production deployment.
