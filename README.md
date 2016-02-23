/etc/systemd/system/srm20.service
```
[Unit]
Description=srm20 service
After=mdns.service pm2.service

[Service]
ExecStart=/bin/su root -c 'cd /home/root/srm20 && pm2 start app.js'
Restart=always
RestartSec=10s

[Install]
WantedBy=default.target

```

```
$ systemctl enable srm20
$ systemctl start srm20
```

#install pm2
```
npm install -g pm2
pm2 startup
pm2 startup systemd
```

