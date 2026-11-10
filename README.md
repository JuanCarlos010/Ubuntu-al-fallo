# Ubuntu-al-fallo
Descripcion: El proyecto sera una pagina web para venta de semejante a un "pedidos ya" tendra roles de
        administrador, vendedor (como el manager de papa johns, burger king, zepped, etc) y tendra de comprador
        para seleccionar los productos

arquitectura: Se hara uso de html, css y javascript para hacer la pagina web, se tiene pensado en una division backend/frontend
        para luego tener la base de datos en backend, con mysql como gestor de base de datos

guia de instalacion:

### Fase 1: Instalación de Servicios Base y SSH
1. Actualizar el sistema e instalar dependencias clave, Nginx y Docker:
   ```bash
   sudo apt update -y
   sudo apt install -y git curl dos2unix nginx docker.io docker-compose-v2
   ```
2. Instalar y habilitar el servidor OpenSSH:
   ```bash
   sudo apt install openssh-server
   sudo systemctl enable --now ssh
   sudo systemctl status ssh
   ```

### Fase 2: Configuración del Firewall (UFW) y Servicios
1. Permitir tráfico esencial y habilitar el firewall:
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw --force enable
   ```
2. Asegurar el funcionamiento de Nginx y Docker tras reinicios:
   ```bash
   sudo systemctl enable --now nginx docker
   ```

### Fase 3: Gestión de Usuarios y Permisos
1. Crear el grupo de administración web:
   ```bash
   sudo groupadd adminweb
   ```
2. Crear usuarios del equipo (repetir por integrante):
   ```bash
   sudo adduser <nombre_usuario>
   ```
3. Otorgar privilegios de administrador (`sudo`) y acceso al grupo web:
   ```bash
   sudo usermod -aG sudo <nombre_usuario>
   sudo usermod -aG adminweb <nombre_usuario>
   ```
4. Corroborar la asignación al grupo:
   ```bash
   getent group adminweb
   ```

### Fase 4: Seguridad y Llaves SSH
1. Crear el directorio oculto para las llaves del usuario:
   ```bash
   sudo mkdir -p /home/<nombre_usuario>/.ssh
   ```
2. Obtener la llave pública desde la máquina local (ejecutar en la computadora personal):
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```
3. Pegar la llave pública en el archivo de autorizaciones del servidor:
   ```bash
   sudo nano /home/<nombre_usuario>/.ssh/authorized_keys
   ```
4. Aplicar permisos estrictos de seguridad:
   ```bash
   sudo chown -R <usuario>:<usuario> /home/<usuario>/.ssh
   sudo chmod 700 /home/<usuario>/.ssh
   sudo chmod 600 /home/<usuario>/.ssh/authorized_keys
   ```

### Fase 5: Hardening Avanzado (Endurecimiento de SSH)
Para reducir drásticamente la superficie de ataque del servidor y cumplir con estándares de seguridad empresarial, el inicio de sesión se ha restringido exclusivamente a llaves criptográficas y se han deshabilitado protocolos vulnerables.

1. Editar el archivo de reglas prioritarias de SSH:
   ```bash
   sudo nano /etc/ssh/sshd_config.d/99-seguridad.conf
   ```

#### Autenticación y Accesos
- PasswordAuthentication no
- PermitRootLogin no
- AllowGroups adminweb sudo
- MaxAuthTries 3
- LoginGraceTime 20
- PermitEmptyPasswords no

#### Bloqueo de métodos interactivos y externos
- ChallengeResponseAuthentication no
- KerberosAuthentication no
- GSSAPIAuthentication no

#### Prevención de túneles, proxys y manipulación de entorno
- X11Forwarding no
- PermitUserEnvironment no
- AllowAgentForwarding no
- AllowTcpForwarding no
- PermitTunnel no

#### Ocultamiento de información del sistema
- DebianBanner no

2. Buscamos reiniciar el sistema

sudo systemctl restart ssh


### Fase 6: Estructura del Proyecto Web
1. Crear la carpeta raíz del proyecto:
   ```bash
   sudo mkdir -p /var/www/html/proyecto
   ```
2. Transferir la propiedad al usuario root y al grupo adminweb:
   ```bash
   sudo chown -R root:adminweb /var/www/html/proyecto
   ```
3. Asignar permisos colaborativos (775) y forzar la herencia de grupo para evitar conflictos al crear nuevos archivos:
   ```bash
   sudo chmod -R 775 /var/www/html/proyecto
   sudo chmod g+s /var/www/html/proyecto
   ```

### Fase 7: Vulnerabilidad de Servidor
Como parte de los requisitos de evaluación, se habilita intencionalmente una vulnerabilidad de configuración insegura exponiendo un puerto libre:
```bash
sudo ufw allow 8080/tcp
```

### Fase 8: Minimización del Sistema y Optimización de Recursos
Para maximizar la memoria RAM disponible para los contenedores de Docker y reducir la superficie de ataque del sistema operativo, se deshabilitan permanentemente servicios predeterminados de Ubuntu que no son requeridos en un entorno de servidor virtualizado.

1. Detener y deshabilitar servicios de hardware, impresión y redes inalámbricas innecesarias:
   ```bash
   sudo systemctl disable --now multipathd
   sudo systemctl disable --now bluetooth
   sudo systemctl disable --now ModemManager
   sudo systemctl disable --now wpa_supplicant
   sudo systemctl disable --now cups
   sudo systemctl disable --now avahi-daemon
    ```

### Fase 9: Hardening del Servidor Web (Nginx)

Para proteger la aplicación web contra ataques comunes y evitar la fuga de información sobre la infraestructura, se han aplicado cabeceras de seguridad HTTP y se ha ocultado la versión exacta del servidor.

1. Abrir el archivo de configuración principal de Nginx:
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```
Dentro del bloque http {...} es necesario modificar y agregar lo siguiente:

- server_tokens off;

- add_header X-XSS-Protection "1; mode=block";
- add_header X-Frame-Options "SAMEORIGIN";
- add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'self';" always;

2. Procedemos a reiniciar el servicio

```bash
sudo systemctl restart nginx
```




usuarios y credenciales: [Stand by...]

vulnerabilidades: se tiene pensado usar mysql inyeccion y ports

flujo de trabajo: [stand by..]

