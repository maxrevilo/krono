#This helper function will add a directory to the PATH if it exists
#This is a simple way to handle different machines, OSes, and configurations
addPath() {
    if [ -d "${1}" ]; then
        if [ -z "${PATH}" ]; then
            export PATH="${1}"
        else
          export PATH=$PATH:"${1}"
        fi
    fi
}

setupPath() {
    #Start with an empty PATH
    OLD_PATH=$PATH
    PATH=
    #Local pwd stuff
    addPath "${PWD}/script"
    addPath "${PWD}/bin"
    #For node
    addPath "${PWD}/node_modules/.bin"
    addPath "${PWD}/node/bin"
    #For python virtualenvs
    addPath "${PWD}/python/bin"

    #Personal home dir stuff
    addPath ~/bin
    #For rbenv
    addPath ~/.rbenv/bin
    addPath ~/.cabal/bin
    #Homebrew
    addPath ~/Library/Python/2.7/bin
    addPath /usr/local/share/python
    addPath /usr/local/bin
    #XCode/Developer
    addPath /Developer/usr/bin
    #Normal system stuff
    addPath /bin
    addPath /usr/bin
    addPath /sbin
    addPath /usr/sbin
    addPath /usr/X11/bin
    PATH=$PATH:$OLD_PATH
}
#Run this during shell startup. Can be re-run as needed manually as well
setupPath
