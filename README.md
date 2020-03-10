## Resources

* IOTA Tangle Viewer -https://thetangle.org/
* IOTA Docs - https://docs.iota.org/
* IOTA JavaScript Client Library - iota.lib.js

## Community

* Discord - https://discord.iota.org/

## Glossary

* IOTA node - Connects to the IOTA network. Exposes HTTP API for interaction
* IOTA client - Uses client libraries to establish a connection with the IRI (IOTA node) for interaction. Since no credentials are required it is important to keep the node APIs port hidden from the external network (or configured with `--remote-auth` and `--remote-limit-api`)
* IOTA wallet - IOTA addresses are distinct wallets that can store IOTA tokens and should be generated securely from a seed. Claiming ownership of a given address requires the seed it was generated from (i.e. private key to your box of wallets). Create a seed with `cat /dev/urandom | LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1` at the command line (i.e. it looks like FNCWNXJWJIVDGPRWNZYKOMKNIIATPPDKEVCZEWSZTEVIWJFCOUV9PJD9AUCEVQLFEAI9UBUAVQKVEBLKN) and store the seed securely and privately as it gives full access to all the addresses (wallets) we will create using it. This function returns a 90-tryte address (81-trytes for the address itself and 9-trytes for the checksum).
* IOTA client libraries - IOTA provides 3x official libraries including iota.lib.js (JavaScript), which is the most mature wrapper for API endpoints. See https://docs.iota.org/docs/client-libraries/0.1/getting-started/quickstart

## References

* https://brightinventions.pl/blog/iota-hello-world/
