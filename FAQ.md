## Frequently Asked Questions (FAQ)

### 1. Why does the series start from v5 instead of v1?

The numbering of this modpack series starts at v5 because it builds on several earlier, non-public development versions that preceded the official launch of the 1.21.4 branch. Specifically:

- We released **1.20.1-v1**, **1.20.6-v2**, and **1.21.1-v3** as internal test builds
- We developed **1.21.4-v4** as a pilot build, but it suffered from severe mod conflicts and other issues
- **1.21.4-v5** marked the first stable, polished version suitable for public distribution

### 2. How long will it take to update the modpack after Mojang releases a new Minecraft version?

- **Beta versions**: Usually rolled out **within a week** following a new Minecraft version launch
- **Stable official versions**: Dependent on the update speed of major mod developers

We will only push the official modpack update once all critical mods have been updated and thoroughly tested for stability.

### 3. Why is the number of mods uneven across different series of the modpack?

The discrepancy in mod counts across different modpack series stems from:
- Each series being tailored to a distinct main Minecraft version
- Mod development being community-driven and not always in lockstep with Mojang's releases
- The need to either abandon incompatible mods or adopt alternative ported versions

### 4. Can OptiFine be added to the modpack?

No, this modpack uses **Sodium + Iris Shaders** as its default rendering core, which is fully incompatible with OptiFine. For shader support, simply place your preferred shader files into the **shaderpacks** folder in the modpack directory.

### 5. Will a NeoForge version of the modpack be released in the future?

At present, approximately 80% of the core mods that define this modpack's gameplay experience only maintain active Fabric branches. As a result, we have no concrete migration plan for a NeoForge version in the short term.

### 6. Why do "old version" mods still remain in the new modpack releases?

The retention of older-version mods is a deliberate, test-verified decision:
- In some cases, mod developers have not yet released updated versions
- We conduct rigorous compatibility testing to check if older mod versions can run on new Minecraft versions
- Once official updated versions are released, we immediately replace the old versions

### 7. After a bug is reported by the community, how long will it take to be fixed?

- **Modpack-specific issues**: We aim to roll out a hotfix or patch update within **1–2 weeks** (3–5 business days for critical bugs)
- **Upstream-related issues**: We will report the bug to the relevant developers and monitor the progress of the official fix

### 8. What is the versioning scheme of the modpack?

The modpack follows a three-stage release cycle: **Alpha**, **Beta**, and **Stable (Release)**.

- **Alpha phase**: Focuses on including all planned mods. Once the mod completion rate reaches 95%, the version transitions to Beta.
- **Beta phase**: Concentrates on polishing features, fixing bugs, continuing to add remaining mods, and adjusting the mod list to better suit the target Minecraft version.
- **Stable (Release) phase**: Handles regular iterative updates, minor patches, major bug fixes, and hotfixes as needed.

### 9. What determines the lifecycle of the modpack?

The lifecycle of the modpack is directly tied to our server's version number. When our server upgrades to a new major Minecraft version, the corresponding modpack version reaches its end of life and development shifts to the next major version. In other words, support for the old version is discontinued once the server moves forward.
