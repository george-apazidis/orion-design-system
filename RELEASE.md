# Release

## release.sh
The `release.sh` bash script does a few primary functions that aid in managing releases.
1. Grabs the current `version` from `/packages/orion-design-system/package.json`, since the core Stencil library is where all versioning updates are made.
2. Prompts the user to see if they want to continue the release using the version we just grabbed in step 1.
	- If yes, proceeds to step 3.
	- If no, asks the user to enter a new version number.
3. Now that the Stencil library has been set, the script now goes through the same process for React.
4. With all versions set, the user is prompted to review and continue.
5. Multiple processes get fired-off, resulting with all library versions updated using the information gathered above.
6. The release process is started, firing off the Stencil and React release npm scripts. 

For more granular information on these functions, please refer to the inline comments in `release.sh`
