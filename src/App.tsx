import React, { useState } from 'react';
import { Shield, Copy, Check, Monitor, Smartphone, Apple, GlobeLock, Server, Info, Filter, AlertTriangle } from 'lucide-react';

const DNS_SERVERS = {
  ipv4: ['94.140.14.14', '94.140.15.15'],
  ipv6: ['2a10:50c0::ad1:ff', '2a10:50c0::ad2:ff'],
};

const CUSTOM_FILTERS = [
  "! TapeStream & MixDrop Custom Filters",
  "||mixdrop.*/js/pop.js$script",
  "||mixdrop.*/ad/*",
  "mixdrop.*##+js(acis, document.cookie, popunder)",
  "||tapestream.*/ads/*",
  "||tapestream.*/popunder.js$script",
  "tapestream.*##+js(window.open-defuser)"
].join('\n');

type Tab = 'windows' | 'mac' | 'android' | 'ios' | 'router';

export default function App() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('windows');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ServerBlock = ({ title, ips, prefix }: { title: string; ips: string[]; prefix: string }) => (
    <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700/50">
      <h3 className="text-sm font-medium text-zinc-400 mb-3">{title}</h3>
      <div className="space-y-2">
        {ips.map((ip, idx) => {
          const id = `${prefix}-${idx}`;
          const isCopied = copiedId === id;
          return (
            <div key={ip} className="flex items-center justify-between bg-zinc-900 rounded-lg p-3 group hover:border-emerald-500/30 border border-transparent transition-colors">
              <code className="text-zinc-200 font-mono text-sm sm:text-base">{ip}</code>
              <button
                onClick={() => handleCopy(ip, id)}
                className={`p-2 rounded-md transition-colors ${
                  isCopied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700'
                }`}
                aria-label="Copy to clipboard"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Background accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-2xl mb-6 ring-1 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <GlobeLock size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-500">
            AdGuard DNS Setup
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Block intrusive ads, pop-ups, and trackers on anime streaming sites system-wide without installing extensions.
          </p>
        </div>

        {/* DNS Servers Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Server size={20} className="text-emerald-400" />
            <h2 className="text-xl font-semibold">DNS Servers</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <ServerBlock title="IPv4 Addresses (Standard)" ips={DNS_SERVERS.ipv4} prefix="ipv4" />
            <ServerBlock title="IPv6 Addresses (Modern)" ips={DNS_SERVERS.ipv6} prefix="ipv6" />
          </div>
          <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex gap-3 text-sm text-blue-200">
            <Info size={20} className="shrink-0 text-blue-400" />
            <p>Using these DNS servers will automatically block known ad domains and tracking servers across all your applications, not just your browser.</p>
          </div>
        </div>

        {/* Advanced Filters Section (MixDrop / TapeStream) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} className="text-emerald-400" />
            <h2 className="text-xl font-semibold">Tough Hosts: MixDrop & TapeStream</h2>
          </div>
          
          <div className="bg-zinc-900/50 rounded-2xl border border-amber-500/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4 text-amber-200/90">
                <AlertTriangle size={24} className="shrink-0 text-amber-500" />
                <div>
                  <h3 className="font-semibold text-amber-400 mb-1">DNS is sometimes not enough for video players</h3>
                  <p className="text-sm">
                    Hosts like MixDrop and TapeStream use complex JavaScript popunders and first-party ads that DNS cannot block without breaking the video player. For these specific sites, you must use a browser extension like <strong>uBlock Origin</strong> alongside AdGuard DNS.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <p className="text-sm text-zinc-400 font-medium">Add these custom filters to your uBlock Origin "My filters" tab:</p>
                <div className="relative group">
                  <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm font-mono text-emerald-400/90 overflow-x-auto">
                    <code>{CUSTOM_FILTERS}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(CUSTOM_FILTERS, 'custom-filters')}
                    className="absolute top-3 right-3 p-2 bg-zinc-800/80 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors backdrop-blur-sm"
                    aria-label="Copy filters"
                  >
                    {copiedId === 'custom-filters' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup Guides */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Shield size={20} className="text-emerald-400" />
            <h2 className="text-xl font-semibold">Setup Instructions</h2>
          </div>

          <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-zinc-800 scrollbar-hide">
              {[
                { id: 'windows', label: 'Windows', icon: Monitor },
                { id: 'mac', label: 'macOS', icon: Apple },
                { id: 'android', label: 'Android', icon: Smartphone },
                { id: 'ios', label: 'iOS', icon: Smartphone },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-400/5'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'windows' && (
                <ol className="list-decimal list-inside space-y-4 text-zinc-300">
                  <li>Open the <strong>Control Panel</strong> from the Start menu.</li>
                  <li>Go to <strong>Network and Internet</strong> {'>'} <strong>Network and Sharing Center</strong>.</li>
                  <li>Click on <strong>Change adapter settings</strong> on the left sidebar.</li>
                  <li>Right-click your active connection (Wi-Fi or Ethernet) and select <strong>Properties</strong>.</li>
                  <li>Select <strong>Internet Protocol Version 4 (TCP/IPv4)</strong> and click <strong>Properties</strong>.</li>
                  <li>Select <strong>Use the following DNS server addresses</strong>.</li>
                  <li>Enter <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">94.140.14.14</code> and <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">94.140.15.15</code>.</li>
                  <li>Click <strong>OK</strong> and restart your browser.</li>
                </ol>
              )}

              {activeTab === 'mac' && (
                <ol className="list-decimal list-inside space-y-4 text-zinc-300">
                  <li>Click the Apple menu and select <strong>System Settings</strong> (or System Preferences).</li>
                  <li>Click <strong>Network</strong> and select your active connection (Wi-Fi or Ethernet).</li>
                  <li>Click <strong>Details...</strong> or <strong>Advanced...</strong>.</li>
                  <li>Select the <strong>DNS</strong> tab.</li>
                  <li>Click the <strong>+</strong> button at the bottom of the DNS Servers list.</li>
                  <li>Enter <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">94.140.14.14</code> and press Enter. Add <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">94.140.15.15</code> as well.</li>
                  <li>Click <strong>OK</strong> and then <strong>Apply</strong>.</li>
                </ol>
              )}

              {activeTab === 'android' && (
                <div className="space-y-4 text-zinc-300">
                  <p className="text-sm text-zinc-400 mb-4">Note: Android 9 (Pie) or newer supports Private DNS natively.</p>
                  <ol className="list-decimal list-inside space-y-4">
                    <li>Open your device's <strong>Settings</strong> app.</li>
                    <li>Go to <strong>Network & internet</strong> or <strong>Connections</strong>.</li>
                    <li>Tap on <strong>More connection settings</strong> or <strong>Advanced</strong>.</li>
                    <li>Select <strong>Private DNS</strong>.</li>
                    <li>Choose <strong>Private DNS provider hostname</strong>.</li>
                    <li>Enter <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">dns.adguard-dns.com</code> and tap <strong>Save</strong>.</li>
                  </ol>
                </div>
              )}

              {activeTab === 'ios' && (
                <ol className="list-decimal list-inside space-y-4 text-zinc-300">
                  <li>Open the <strong>Settings</strong> app on your iPhone or iPad.</li>
                  <li>Tap on <strong>Wi-Fi</strong>.</li>
                  <li>Tap the "<strong>i</strong>" icon next to the Wi-Fi network you are connected to.</li>
                  <li>Scroll down and tap <strong>Configure DNS</strong>.</li>
                  <li>Change the setting from <strong>Automatic</strong> to <strong>Manual</strong>.</li>
                  <li>Delete any existing DNS servers by tapping the red minus icon.</li>
                  <li>Tap <strong>Add Server</strong> and enter <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">94.140.14.14</code>. Add another for <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">94.140.15.15</code>.</li>
                  <li>Tap <strong>Save</strong> in the top right corner.</li>
                </ol>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-zinc-500 text-sm">
          <p>For anime sites, this setup blocks domains known to serve intrusive ads and pop-ups.</p>
          <p className="mt-1">If a site breaks, you may need to temporarily switch your DNS back to Automatic.</p>
        </div>
      </div>
    </div>
  );
}
