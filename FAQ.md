## Frequently Asked Questions (FAQ)

### 1. Why does the series start from v5 instead of v1?

The numbering starts at v5 because earlier internal builds preceded the public launch of the 1.21.4 branch:

- We released **1.20.1-v1**, **1.20.6-v2**, and **1.21.1-v3** as internal test builds
- **1.21.4-v4** was a pilot build that had mod conflicts and other issues
- **1.21.4-v5** was the first version we considered stable enough for public release

### 2. How long will it take to update the modpack after Mojang releases a new Minecraft version?

- **Beta versions**: Usually within **a week** after a new Minecraft release, but no guarantees
- **Stable versions**: Depends on how quickly major mod developers update their mods

We'll publish an official update only after critical mods have been updated and basic testing passes. Delays are possible.

### 3. Why is the number of mods uneven across different series of the modpack?

Differences in mod counts happen because:

- Each series targets a different Minecraft version
- Mod updates are community-driven and not always in sync with Mojang
- Some mods become incompatible and need to be replaced or removed

### 4. Can OptiFine be added to the modpack?

No, this modpack uses **Sodium + Iris Shaders** as its rendering core, which is incompatible with OptiFine. For shader support, place your shader files into the **shaderpacks** folder. Compatibility with specific shaders may vary.

### 5. Will a NeoForge version of the modpack be released in the future?

Currently, about 80% of the core mods in this pack only maintain active Fabric branches. We have no immediate plans for a NeoForge version, but that could change if mod support shifts.

### 6. Why do "old version" mods still remain in the new modpack releases?

Sometimes we keep older mod versions for practical reasons:

- The mod developer hasn't released an updated version yet
- We test older versions to see if they still work on newer Minecraft (not guaranteed)
- Once official updates are available, we replace the old versions

### 7. After a bug is reported by the community, how long will it take to be fixed?

- **Modpack-specific issues**: We try to release a fix within **1–2 weeks** (critical bugs may be faster, but no promises)
- **Upstream-related issues**: We'll report the bug to the mod developer and monitor progress. Fix times depend on them.

### 8. What is the versioning scheme of the modpack?

The pack uses a three-stage cycle: **Alpha**, **Beta**, and **Stable (Release)**.

- **Alpha**: Focuses on including planned mods. Once mod completion reaches roughly 95%, it moves to Beta.
- **Beta**: Focuses on polishing, bug fixing, adding remaining mods, and adjusting the mod list.
- **Stable (Release)**: Handles iterative updates, minor patches, major bug fixes, and hotfixes as needed.

### 9. What determines the lifecycle of the modpack?

The lifecycle is tied to our server's version. When our server upgrades to a new major Minecraft version, we stop active support for the old modpack version and shift development to the next one. Old versions may still work, but we won't provide updates or fixes for them.
