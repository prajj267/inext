# Setup SSH Key Authentication (More Secure)

If password authentication isn't working, SSH keys are better anyway.

## Step 1: Generate SSH Key Pair (on your computer)

Open PowerShell and run:

```powershell
ssh-keygen -t ed25519 -C "ppraj@iitpatna"
```

Press Enter 3 times (accept defaults, no passphrase for simplicity).

This creates:
- Private key: `C:\Users\ppraj\.ssh\id_ed25519`
- Public key: `C:\Users\ppraj\.ssh\id_ed25519.pub`

## Step 2: Copy Public Key to Server

You need to give your **public key** to the server admin. Run:

```powershell
Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

Copy the output and email it to your server admin, asking them to add it to:
```
~/.ssh/authorized_keys
```

## Step 3: Test SSH Connection

After admin adds your key:

```powershell
ssh -i "$env:USERPROFILE\.ssh\id_ed25519" yourusername@172.16.1.251
```

Replace `yourusername` with the correct username from admin.

## Step 4: Upload Files with SCP

Once SSH works:

```powershell
scp -i "$env:USERPROFILE\.ssh\id_ed25519" -r "C:\Projects\website iit\inext-website\out\*" yourusername@172.16.1.251:~/public_html/
```
