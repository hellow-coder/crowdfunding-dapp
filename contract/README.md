markdown# 🍵 CrowdFund - Decentralized Crowdfunding

Blockchain pe crowdfunding - no middleman, no bank, sirf smart contract!

## Tech Stack

- **Solidity** - Smart contracts
- **Foundry** - Development & testing framework
- **OpenZeppelin** - Secure contract libraries

## Project Structure
src/

└── Crowdfunding.sol      ← main contract
test/

└── CrowdfundingTest.t.sol  ← tests
script/

└── DeployCrowdfunding.s.sol  ← deploy script

## Setup

```shell
# Dependencies install karo
make install

# Compile karo
make build
```

## Testing

```shell
# Saare tests
make test

# Detailed logs ke saath
make test-v
```

## Deploy

```shell
# Terminal 1 - local blockchain start karo
make anvil

# Terminal 2 - deploy karo
make deploy

# Sepolia testnet pe deploy
make deploy-sepolia
```

## Commands

```shell
make help    # sab commands dekho
```
Bas itna hi — default wala hata, yeh daal. Baaki sab make help se milega. 🔥
Ab contract likhna shuru kare Crowdfunding.sol? 👀



==============================================================>




Bhai ekdum simple — jaise tu kisi website pe jaata hai, waise soch:

🌐 User Website Pe Aaya
1️⃣ Pehli Screen — Homepage
┌─────────────────────────────────┐
│  🍵 CrowdFund                   │
│                                 │
│  [Connect Wallet] ← button      │
│                                 │
│  Active Campaigns:              │
│  ┌──────────┐  ┌──────────┐    │
│  │Vikas Chai│  │Rahul Shop│    │
│  │0.3/0.5ETH│  │0.1/1 ETH │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  [+ Create Campaign]            │
└─────────────────────────────────┘

2️⃣ Wallet Connect kiya
MetaMask popup aaya → "Connect" click kiya

Ab site jaanta hai:
✅ Tera address kya hai
✅ Tere paas kitna ETH hai

3️⃣ Campaign Create karna hai
Form khula:

📝 Title:       "Mera Chai Ka Thela"
📄 Description: "Nagpur me chai thela kholna hai"
🖼️ Image URL:   "https://..."
🎯 Goal:        0.5 ETH
⏰ Deadline:    30 days

[Submit] → MetaMask → Confirm → ✅ Done

4️⃣ Kisi Campaign pe Click kiya (Donor)
┌─────────────────────────────────┐
│  🍵 Mera Chai Ka Thela          │
│  by: 0xVikas...                 │
│                                 │
│  Goal:    0.5 ETH               │
│  Raised:  0.3 ETH  [=====>  ]  │
│  Deadline: 15 days left         │
│                                 │
│  Amount: [0.1 ETH]              │
│  [Donate Now]                   │
└─────────────────────────────────┘

5️⃣ Donate kiya
MetaMask popup:
"Send 0.1 ETH to contract?"
→ Confirm

✅ 0.1 ETH lock ho gaya contract me
✅ Campaign update ho gayi

6️⃣ Ab 2 Cases:
CASE A ✅ — Goal Mil Gaya
─────────────────────────
Vikas (creator) dashboard pe aaya:
"Goal Met! 🎉 Withdraw karo"
→ [Withdraw] click kiya
→ MetaMask confirm
→ 0.5 ETH Vikas ke wallet me!


CASE B ❌ — Goal Nahi Mila (30 din baad)
─────────────────────────────────────────
Rahul (donor) dashboard pe aaya:
"Campaign Failed 😔 Refund lo"
→ [Get Refund] click kiya
→ MetaMask confirm
→ 0.1 ETH wapas Rahul ke wallet me!

🔑 Toh Contract me Bas Yahi 5 Kaam Hain:
1. createCampaign()  ← form submit hone pe
2. donate()          ← donate button pe
3. withdraw()        ← creator ka withdraw
4. refund()          ← donor ka refund
5. getCampaigns()    ← homepage pe campaigns dikhane ke liye

Bas bhai! Itna hi hai poora flow.
Ab contract likhun step by step? 🔥