# Dev Notes

```shell
sudo apt-get install rpm

```



```shell
 npm run-script electron-build && electron-packager . --linux zip --overwrite



```

## Other
```shell
    "electron-build": "npm run build && ./node_modules/.bin/electron-builder  --linux deb zip rpm snap --win msi zip --mac dmg zip --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds",

```