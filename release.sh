#!/bin/bash

# echo the Orion logo in ASCII for fun 
orionAscii () {
  echo ""
  echo ""
  echo "    ███████    ███████████   █████    ███████    ██████   █████
  ███░░░░░███ ░░███░░░░░███ ░░███   ███░░░░░███ ░░██████ ░░███ 
 ███     ░░███ ░███    ░███  ░███  ███     ░░███ ░███░███ ░███ 
░███      ░███ ░██████████   ░███ ░███      ░███ ░███░░███░███ 
░███      ░███ ░███░░░░░███  ░███ ░███      ░███ ░███ ░░██████ 
░░███     ███  ░███    ░███  ░███ ░░███     ███  ░███  ░░█████ 
 ░░░███████░   █████   █████ █████ ░░░███████░   █████  ░░█████
   ░░░░░░░    ░░░░░   ░░░░░ ░░░░░    ░░░░░░░    ░░░░░    ░░░░░ "
echo ""
}

# navigates to the Stencil library
cdToStencilLibrary() {
  pwd
  cd packages/orion-design-system
  pwd
}

# navigates to the React library
cdToReactLibrary() {
  pwd
  cd packages/orion-design-system-react
  pwd
}

# navigates to the Vue library
cdToVueLibrary() {
  cd packages/orion-design-system-vue
}

# navigates to the Root library
cdToRoot () {
  pwd
  cd ..
  cd ..
  pwd
}

# grabs the base version from the root package.json, saves to STENCILBASE var
getPackageVersion() {
  # cdToRoot
  STENCILBASE=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
}

# presents the base version in terminal
showPackage () {
  echo ""
  echo "Stencil library version from package.json:" $STENCILBASE
}

# low-fi error message
error () {
  echo "Error: $1"
  exit 1
}

# this is the process for user-verification on library release version for Stencil
# could likely be refactored into smaller pieces
stencilCheck () {
  # prompt user for Stencil library release version and save result
  # when finished, starts the React version of the same process

  echo ""
  echo -n "Stencil library release version:" $STENCILBASE "(yes/no) "
  read yn

  if [[ "$yn" = "yes" || "$yn" = "y" || "$yn" = "Y" || "$yn" = "Yes" || "$yn" = "YES"  ]]
  then
    # convert into STENCILFINAL variable to use going forward
    STENCILNEW=$STENCILBASE
    STENCILFINAL=$STENCILBASE
    # move on to next library
    reactCheck
  elif [[ "$yn" = "no" || "$yn" = "n" || "$yn" = "N" || "$yn" = "No" || "$yn" = "NO"  ]]
  then
    # prompt user for new release version number
    echo "Enter Stencil library release version: " 
    read STENCILNEW
    # convert into STENCILFINAL variable to use going forward
    STENCILFINAL=$STENCILNEW
    # move on to next library
    reactCheck
  else
    error
  fi
}

# this is the process for user-verification on library release version for React
# could likely be refactored into smaller pieces
reactCheck () {
  # prompt user for Stencil library release version and save result
  # when finished, starts the React version of the same process

  if [[ "$STENCILNEW" = "$STENCILBASE" ]]
  then 
    REACTBASE=$STENCILBASE
    echo -n "React library release version:" $REACTBASE "(yes/no) "
    read yn
    if [[ "$yn" = "yes" || "$yn" = "y" || "$yn" = "Y" || "$yn" = "Yes" || "$yn" = "YES"  ]]
    then
      REACTBASE=$STENCILBASE
      REACTFINAL=$STENCILBASE
      # vueCheck
      allCheck
    else 
      echo "Enter React library release version: " 
      read REACTNEW
      REACTFINAL=$REACTNEW
      # vueCheck
      allCheck
    fi
  else 
    echo -n "React library release version:" $STENCILNEW "(yes/no) "
    read yn
    REACTNEW=$STENCILNEW
    if [[ "$yn" = "yes" || "$yn" = "y" || "$yn" = "Y" || "$yn" = "Yes" || "$yn" = "YES"  ]]
    then
      REACTBASE=$STENCILNEW
      REACTFINAL=$REACTBASE
      # vueCheck
      allCheck
    else 
      echo "Enter React library release version: " 
      read REACTNEW
      REACTFINAL=$REACTNEW
      # vueCheck
      allCheck
    fi
  fi
}

# this is the process for user-verification on library release version for Vue
# could likely be refactored into smaller pieces
vueCheck () {
  # prompt user for Stencil library release version and save result
  # when finished, starts the process for final user package version verification

  # checking if default version was selected
  if [[ "$STENCILNEW" = "$STENCILBASE" ]]
  then 
    VUEBASE=$STENCILBASE
    echo -n "Vue library release version:" $VUEBASE "(yes/no) "
    read yn
    if [[ "$yn" = "yes" || "$yn" = "y" || "$yn" = "Y" || "$yn" = "Yes" || "$yn" = "YES"  ]]
    then
      VUEBASE=$STENCILBASE
      VUEFINAL=$VUEBASE
      allCheck
    else 
      echo "Enter Vue library release version: " 
      read VUENEW
      VUEFINAL=$VUENEW
      allCheck
    fi
  else 
    echo -n "Vue library release version:" $STENCILNEW "(yes/no) "
    read yn
    VUENEW=$STENCILNEW
    if [[ "$yn" = "yes" || "$yn" = "y" || "$yn" = "Y" || "$yn" = "Yes" || "$yn" = "YES"  ]]
    then
      VUEBASE=$STENCILNEW
      VUEFINAL=$VUEBASE
      allCheck
    else 
      echo "Enter Vue library release version: " 
      read VUENEW
      VUEFINAL=$VUENEW
      allCheck
    fi
  fi
}

# final prompt to review all package versions
# if/else to continue to update the library package versions in each package.json or repeat the process
allCheck () {
  echo ""
  echo "Stencil library release version:" $STENCILFINAL
  echo "React library release version:" $REACTFINAL
  # echo "Vue library release version:" $VUEFINAL
  echo ""

  echo -n "Release with these library versions? (yes/no) "
  read yn

  if [[ "$yn" = "yes" || "$yn" = "y" || "$yn" = "Y" || "$yn" = "Yes" || "$yn" = "YES"  ]]
  then
    echo ""
    updateJsons
  elif [[ "$yn" = "no" || "$yn" = "n" || "$yn" = "N" || "$yn" = "No" || "$yn" = "NO"  ]]
  then
    stencilCheck
  else
    error
  fi
}

# runs the script to update each library package version
updateJsons () {
  updateStencil  
  updateReact
  # updateVue
}

# grabs the initial state library version for Stencil
# this is used to populate the "find" portion of a "find & replace"
getPackageVersionStencil() {
  # grabs the version number from package.json
  STENCILGREP=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
}

# grabs the initial state library version for React
# this is used to populate the "find" portion of a "find & replace"
getPackageVersionReact() {
  # grabs the version number from package.json
  REACTGREP=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
}

getPackageVersionVue() {
  # grabs the version number from package.json
  VUEGREP=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
}

getPackageStencil () {
  getPackageVersionStencil
}

getPackageReact () {
  getPackageVersionReact
}

getPackageVue () {
  getPackageVersionVue
}

updateStencil () {
  # navigate to the orion-design-system folder
  # cdToRoot
  cdToStencilLibrary
  # grab pre-existing version# from orion-design-system-react/package.json
  getPackageStencil  
  # clean grep'd version numbers of whitespace
  STENCILFINALCLEAN=$(echo $STENCILFINAL | tr -d ' ')
  STENCILGREPCLEAN=$(echo $STENCILGREP | tr -d ' ')
  # concat version numbers into sed command
  SEDSTRING="s/${STENCILGREPCLEAN}/${STENCILFINALCLEAN}/g"
  SEDQUOTES="''"
  SEDSTRINGFULL="-i ${SEDQUOTES} ${SEDSTRING}"
  # find and replace old version with new version
  sed -i package.copyfile -e $SEDSTRING -- package.json  
  cdToRoot  
}

updateReact () {
  # navigate to the orion-design-system-react folder
  # cdToRoot
  cdToReactLibrary
  # grab pre-existing version# from orion-design-system-react/package.json
  getPackageReact
  # clean grep'd version numbers of whitespace
  REACTFINALCLEAN=$(echo $REACTFINAL | tr -d ' ')
  REACTGREPCLEAN=$(echo $REACTGREP | tr -d ' ')
  # concat version numbers into sed command
  REACTSEDSTRING="s/${REACTGREPCLEAN}/${REACTFINALCLEAN}/g"
  SEDQUOTES="''"
  REACTSEDSTRINGFULL="-i ${SEDQUOTES} ${REACTSEDSTRING}"
  # find and replace old version with new version
  sed -i package.copyfile -e $REACTSEDSTRING -- package.json  
  cdToRoot  
}

updateVue () {
  # navigate to the orion-design-system-vue folder
  cdToRoot
  cdToVueLibrary
  # grab pre-existing version# from orion-design-system-vue/package.json
  getPackageVue
  # clean grep'd version numbers of whitespace
  VUEFINALCLEAN=$(echo $VUEFINAL | tr -d ' ')
  VUEGREPCLEAN=$(echo $VUEGREP | tr -d ' ')
  # concat version numbers into sed command
  VUESEDSTRING="s/${VUEGREPCLEAN}/${VUEFINALCLEAN}/g"
  SEDQUOTES="''"
  VUESEDSTRINGFULL="-i ${SEDQUOTES} ${VUESEDSTRING}"
  # find and replace old version with new version
  sed -i package.copyfile -e $VUESEDSTRING -- package.json  
  cdToRoot  
}

deleteCopies () {
  # calling the npm script for more consistent results
  npm run deleteCopies
}

release () {
  npm run release-stencil
  npm run release-react
  # npm run release-vue
}

wrap () {
  echo ''
  echo ''
  echo 'Release.sh thinks it has successfully published ORION to Artifactory Cloud. Verify with links below 👇'
  echo ''
  echo ''
  echo 'Stencil library'
  echo "https://artifactorycloud.ual.com/ui/repos/tree/General/l-npm/@orion/orion-design-system/-/@orion/orion-design-system-${STENCILFINAL}.tgz"
  echo ''
  echo 'React library'
  echo "https://artifactorycloud.ual.com/ui/repos/tree/General/l-npm/@orion/orion-design-system-react/-/@orion/orion-design-system-react-${REACTFINAL}.tgz"
}

orionAscii
getPackageVersion
showPackage
stencilCheck
deleteCopies
release
wrap