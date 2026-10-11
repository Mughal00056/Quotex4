import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import {
  Bell,
  ChevronDown,
  RotateCcw,
  X,
  Menu,
  Crown,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  Shuffle,
  Trash2,
  PenTool,
  Square,
  Trophy,
  Send,
  Palette,
  Sliders,
  Settings,
  Briefcase,
  History,
  User,
  MessageSquare,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Clock,
  Sparkles,
  CreditCard,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';
import { formatCurrency } from '../utils/chartMath';
import { CANDLE_COLOR_SCHEMES, CandleColorScheme } from '../types/trading';

interface QuotexMobileTopBarProps {
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenHistory: () => void;
  onOpenNotifications: () => void;
  onOpenLeaderboard?: () => void;
  onOpenIndicators?: () => void;
  onOpenChartSettings?: () => void;
  onOpenActiveTrades?: () => void;
  onOpenProfile?: () => void;
  onOpenSupport?: () => void;
}

export const QuotexMobileTopBar: React.FC<QuotexMobileTopBarProps> = ({
  onOpenDeposit,
  onOpenWithdraw,
  onOpenHistory,
  onOpenNotifications,
  onOpenLeaderboard,
  onOpenIndicators,
  onOpenChartSettings,
  onOpenActiveTrades,
  onOpenProfile,
  onOpenSupport
}) => {
  const {
    accountType,
    setAccountType,
    demoBalance,
    realBalance,
    resetDemoBalance,
    setRealBalanceDirect,
    removeRealMoney,
    isVipPurpleLive,
    marketBehaviorMode,
    setMarketBehaviorMode,
    showChartButtons,
    setShowChartButtons,
    showHeaderExtraButtons,
    setShowHeaderExtraButtons,
    showOrderToastEnabled,
    setShowOrderToastEnabled,
    soundEnabled,
    setSoundEnabled,
    activeDrawingTool,
    setActiveDrawingTool,
    clearDrawnLines,
    drawnLines,
    traderName,
    setTraderName,
    traderFlag,
    setTraderFlag,
    customLeaderboardProfit,
    setCustomLeaderboardProfit,
    customLeaderboardRank,
    setCustomLeaderboardRank,
    candleColorScheme,
    setCandleColorScheme,
    logoImageUrl,
    setLogoImageUrl,
    backgroundImageUrl,
    setBackgroundImageUrl,
    watermarkSize,
    setWatermarkSize,
    watermarkOpacity,
    setWatermarkOpacity,
    watermarkType,
    setWatermarkType
  } = useTrading();

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [showThreeLineMenu, setShowThreeLineMenu] = useState(false);
  const [customBalanceInput, setCustomBalanceInput] = useState<string>('');
  const [profitInput, setProfitInput] = useState<string>(
    customLeaderboardProfit !== null ? customLeaderboardProfit.toString() : '-5.21'
  );
  const [rankInput, setRankInput] = useState<string>(
    customLeaderboardRank !== null ? customLeaderboardRank.toString() : '37019'
  );

  const flags = ['🇵🇰', '🇮🇳', '🇦🇪', '🇸🇦', '🇧🇷', '🇺🇸', '🇬🇧', '🇪🇬', '🇮🇩', '🇹🇷'];

  return (
    <div className="flex flex-col z-30 select-none bg-[#0a0d14]">
      {/* 1. Header Row with 3-Line Menu + LIVE/DEMO Account Selector */}
      <div className="h-13 px-2.5 sm:px-3 flex items-center justify-between border-b border-[#18212f]">
        {/* Left Side: 3-Line Hamburger Menu + Account Selector */}
        <div className="flex items-center gap-2">
          {/* 3-Line Hamburger Menu Button next to LIVE ("meanu 3line ho live ka sath aus ma feature add karo") */}
          <button
            onClick={() => setShowThreeLineMenu(true)}
            className="w-9 h-9 rounded-xl bg-[#141b27] hover:bg-[#1b2435] border border-[#232f44] flex items-center justify-center text-slate-200 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Trading Control Menu"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Account Selector Pill (No money emoji on LIVE; Purple + Crown when >= $100,000) */}
          <div className="relative">
            <button
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer border ${
                accountType === 'REAL' && isVipPurpleLive
                  ? 'bg-[#1b122c] hover:bg-[#231739] border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-[#141b27] hover:bg-[#1a2333] border-[#232f44]'
              }`}
            >
              {/* Icon: Crown when REAL >= $100,000, Paper plane when REAL < $100,000 (NO money emoji!), Graduation cap when DEMO */}
              {accountType === 'REAL' ? (
                isVipPurpleLive ? (
                  <Crown className="w-4 h-4 text-purple-400 fill-purple-400 shrink-0 drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
                ) : (
                  <Send className="w-3.5 h-3.5 text-[#00e599] -rotate-12 shrink-0" />
                )
              ) : (
                <span className="text-xs sm:text-sm">🎓</span>
              )}

              <span
                className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${
                  accountType === 'REAL'
                    ? isVipPurpleLive
                      ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]'
                      : 'text-[#00e599]'
                    : 'text-amber-400'
                }`}
              >
                {accountType === 'REAL' ? 'LIVE' : 'DEMO'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* Account Dropdown */}
            {showAccountDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/30"
                  onClick={() => setShowAccountDropdown(false)}
                />
                <div className="absolute left-0 mt-2 w-72 bg-[#141b26] border border-[#273245] rounded-xl shadow-2xl p-3 z-50 animate-scaleUp">
                  <div className="text-[10px] text-slate-400 font-bold uppercase mb-2 flex items-center justify-between">
                    <span>Switch Trading Account</span>
                    {isVipPurpleLive && (
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-1.5 py-0.5 rounded font-black flex items-center gap-1">
                        <Crown className="w-3 h-3 text-purple-400 fill-purple-400" />
                        VIP STATUS
                      </span>
                    )}
                  </div>

                  {/* Demo Account */}
                  <div
                    onClick={() => {
                      setAccountType('DEMO');
                      setShowAccountDropdown(false);
                    }}
                    className={`p-2.5 rounded-lg border mb-2 cursor-pointer transition-colors ${
                      accountType === 'DEMO'
                        ? 'bg-[#1b263b] border-cyan-500 text-white'
                        : 'bg-[#151c2a] border-[#222e42] text-slate-300 hover:bg-[#1b2536]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300">🎓 Demo Account</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetDemoBalance();
                        }}
                        className="p-1 rounded hover:bg-[#283850] text-slate-400 hover:text-cyan-300"
                        title="Reset to $10,000"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-base font-extrabold font-mono-num text-white mt-1">
                      {formatCurrency(demoBalance)}
                    </div>
                  </div>

                  {/* Live Account (No money icon; Purple + Crown when >= $100,000) */}
                  <div
                    onClick={() => {
                      setAccountType('REAL');
                      setShowAccountDropdown(false);
                    }}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      accountType === 'REAL'
                        ? isVipPurpleLive
                          ? 'bg-[#211538] border-purple-500 text-white'
                          : 'bg-[#1b263b] border-emerald-500 text-white'
                        : 'bg-[#151c2a] border-[#222e42] text-slate-300 hover:bg-[#1b2536]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold flex items-center gap-1.5 ${
                          isVipPurpleLive ? 'text-purple-400' : 'text-emerald-400'
                        }`}
                      >
                        {isVipPurpleLive ? (
                          <Crown className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                        ) : (
                          <Send className="w-3 h-3 text-emerald-400 -rotate-12" />
                        )}
                        <span>Live Account</span>
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider flex items-center gap-1 ${
                          isVipPurpleLive
                            ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {isVipPurpleLive && <Crown className="w-2.5 h-2.5 fill-current" />}
                        LIVE
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-base font-extrabold font-mono-num text-white">
                        {formatCurrency(realBalance)}
                      </div>
                      {realBalance > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRealMoney();
                          }}
                          className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold"
                          title="Remove Live Money ($0.00)"
                        >
                          Remove $
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#222c3d] flex gap-2">
                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        onOpenDeposit();
                      }}
                      className="flex-1 py-1.5 bg-[#00e599] hover:bg-[#00d084] rounded-lg text-xs font-black text-slate-950 transition-colors cursor-pointer"
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        onOpenWithdraw();
                      }}
                      className="flex-1 py-1.5 bg-[#1f2838] hover:bg-[#28354a] rounded-lg text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right side: Balance display + Bell icon with badge + Deposit button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Right side balance display (clickable to switch demo/live) */}
          <div
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="flex flex-col text-right cursor-pointer pr-1"
            title="Click to switch account"
          >
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">
              {accountType === 'REAL' ? 'Live Balance' : 'Demo Balance'}
            </span>
            <span className="text-xs sm:text-sm font-extrabold font-mono-num text-white leading-tight mt-0.5">
              {accountType === 'REAL' ? formatCurrency(realBalance) : formatCurrency(demoBalance)}
            </span>
          </div>

          <button
            onClick={onOpenNotifications}
            className="relative w-8 h-8 rounded-lg bg-[#141b27] border border-[#232f44] flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>

          <button
            onClick={onOpenDeposit}
            className="px-4 py-1.5 rounded-lg bg-[#00e599] hover:bg-[#00f7a5] active:scale-95 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_2px_12px_rgba(0,229,153,0.35)] transition-all cursor-pointer"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* 2. Promo Banner */}
      {showPromoBanner && (
        <div className="bg-[#00c874] text-slate-950 px-3 py-1.5 flex items-center justify-between text-xs font-bold shadow-sm animate-fadeIn">
          <div
            onClick={onOpenDeposit}
            className="flex items-center gap-2 cursor-pointer flex-1"
          >
            <span className="text-base">🚀</span>
            <span className="text-[11px] sm:text-xs">
              Get a 50% bonus on your deposit!
            </span>
            <span className="bg-[#009e5b] text-white text-[10px] px-2 py-0.5 rounded-full font-black">
              50%
            </span>
          </div>

          <button
            onClick={() => setShowPromoBanner(false)}
            className="p-1 text-slate-900 hover:text-black transition-colors cursor-pointer"
            title="Close Banner"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* 3. 3-LINE CONTROL MENU DRAWER (Next to LIVE) - Fully Smooth Slide & Fade Animation */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          showThreeLineMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop with smooth blur & fade */}
        <div
          className={`absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            showThreeLineMenu ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setShowThreeLineMenu(false)}
        />

        {/* Drawer container with smooth slide-in transform */}
        <div
          className={`relative w-84 max-w-[88vw] h-full bg-[#0e131d] border-r border-[#1f2b3e] shadow-2xl flex flex-col z-10 overflow-hidden transform transition-transform duration-300 ease-out ${
            showThreeLineMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="px-4 py-3 bg-[#131a28] border-b border-[#1f2a3c] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Menu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>Quotex Control Panel</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded font-black">
                    PRO
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Full Trading Engine & Platform Controls</div>
              </div>
            </div>
            <button
              onClick={() => setShowThreeLineMenu(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1c2638] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Account Quick Profile Card */}
          <div className="px-4 py-3 bg-[#101724] border-b border-[#1c2738] shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white text-xs font-black shadow-md">
                  {traderFlag}
                </div>
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1">
                    <span>{traderName || 'YA TRADER'}</span>
                    {isVipPurpleLive && accountType === 'REAL' && (
                      <Crown className="w-3.5 h-3.5 text-purple-400 fill-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span
                      className={`font-black ${
                        accountType === 'REAL' ? 'text-[#00e599]' : 'text-amber-400'
                      }`}
                    >
                      {accountType === 'REAL' ? 'LIVE ACCOUNT' : 'DEMO ACCOUNT'}
                    </span>
                    <span>•</span>
                    <span className="text-white font-mono font-bold">
                      {accountType === 'REAL' ? formatCurrency(realBalance) : formatCurrency(demoBalance)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Reset button if Demo */}
              {accountType === 'DEMO' && (
                <button
                  onClick={resetDemoBalance}
                  className="p-1.5 rounded-lg bg-[#182233] hover:bg-[#202d44] text-slate-300 hover:text-cyan-300 transition-colors"
                  title="Reset Demo Balance to $10,000"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Deposit & Withdraw Buttons in Side Panel */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setShowThreeLineMenu(false);
                  onOpenDeposit();
                }}
                className="py-1.5 px-2.5 rounded-lg bg-[#00e599] hover:bg-[#00f7a5] text-slate-950 font-black text-[11px] flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Deposit ($)</span>
              </button>
              <button
                onClick={() => {
                  setShowThreeLineMenu(false);
                  onOpenWithdraw();
                }}
                className="py-1.5 px-2.5 rounded-lg bg-[#182335] hover:bg-[#22314a] border border-[#273750] text-slate-200 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          {/* Drawer Scrollable Body with smooth touch scrolling */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs overscroll-contain">
            {/* Quick Navigation 8-Button Grid (Restoring all platform sections) */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Navigation & Tools
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenIndicators) onOpenIndicators();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-cyan-400 transition-all cursor-pointer group"
                >
                  <Sliders className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">100+ Ind.</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenChartSettings) onOpenChartSettings();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-white transition-all cursor-pointer group"
                >
                  <Settings className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">Settings</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenActiveTrades) onOpenActiveTrades();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-emerald-400 transition-all cursor-pointer group"
                >
                  <Briefcase className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">Trades</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenHistory) onOpenHistory();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-cyan-400 transition-all cursor-pointer group"
                >
                  <History className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">History</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenLeaderboard) onOpenLeaderboard();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-amber-400 transition-all cursor-pointer group"
                >
                  <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">Rank</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenNotifications) onOpenNotifications();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-white transition-all cursor-pointer group"
                >
                  <Bell className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">Alerts</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenProfile) onOpenProfile();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-cyan-300 transition-all cursor-pointer group"
                >
                  <User className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowThreeLineMenu(false);
                    if (onOpenSupport) onOpenSupport();
                  }}
                  className="p-2 rounded-xl bg-[#141c2b] hover:bg-[#1c273c] border border-[#223049] flex flex-col items-center gap-1 text-center text-slate-300 hover:text-emerald-300 transition-all cursor-pointer group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold">Support</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Trade Outcome Mode (Win / Force Lose / Real Trading Mix) */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  Trade Result Mode
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-cyan-500/20 text-cyan-300 font-mono">
                  {marketBehaviorMode === 'force_loss'
                    ? 'LOSE ON'
                    : marketBehaviorMode === 'realistic'
                    ? 'REAL MIX'
                    : 'WIN ON'}
                </span>
              </div>

              {/* Quick Force Lose Switch */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#191219] border border-rose-500/30">
                <div>
                  <div className="font-bold text-rose-300 text-xs">Force Lose Mode (Loss ON)</div>
                  <div className="text-[10px] text-slate-400">Jab ON karein to trade lose hogi</div>
                </div>
                <button
                  onClick={() =>
                    setMarketBehaviorMode(
                      marketBehaviorMode === 'force_loss' ? 'smart_push' : 'force_loss'
                    )
                  }
                  className={`w-10 h-5 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                    marketBehaviorMode === 'force_loss'
                      ? 'bg-rose-500 justify-end'
                      : 'bg-[#253146] justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>

              {/* 3 Mode Buttons: Smart Win, Force Lose, Real Trading (Win & Lose) */}
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                <button
                  onClick={() => setMarketBehaviorMode('smart_push')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    marketBehaviorMode === 'smart_push'
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                      : 'bg-[#101723] border-[#1f2c40] text-slate-300 hover:bg-[#162030]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Always Win Mode</div>
                      <div className="text-[10px] text-slate-400">Candle follows your Buy/Sell trade</div>
                    </div>
                  </div>
                  {marketBehaviorMode === 'smart_push' && (
                    <span className="text-[10px] font-black bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                      ON
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setMarketBehaviorMode('force_loss')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    marketBehaviorMode === 'force_loss'
                      ? 'bg-rose-950/50 border-rose-500 text-rose-300'
                      : 'bg-[#101723] border-[#1f2c40] text-slate-300 hover:bg-[#162030]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Force Lose Mode</div>
                      <div className="text-[10px] text-slate-400">Candle goes opposite (Trade Lose)</div>
                    </div>
                  </div>
                  {marketBehaviorMode === 'force_loss' && (
                    <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded">
                      ON
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setMarketBehaviorMode('realistic')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    marketBehaviorMode === 'realistic'
                      ? 'bg-amber-950/50 border-amber-500 text-amber-300'
                      : 'bg-[#101723] border-[#1f2c40] text-slate-300 hover:bg-[#162030]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Real Trading (Win & Lose)</div>
                      <div className="text-[10px] text-slate-400">Real market mix — Lose bhi aur Win bhi</div>
                    </div>
                  </div>
                  {marketBehaviorMode === 'realistic' && (
                    <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                      ON
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* SECTION 2: Chart Floating Buttons, Order Notification Toast & Sound FX */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {showChartButtons ? (
                    <Eye className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  )}
                  <div>
                    <div className="font-bold text-white text-xs">Chart Floating Buttons</div>
                    <div className="text-[10px] text-slate-400">Hide or Show left & right chart buttons</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChartButtons(!showChartButtons)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    showChartButtons
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'bg-[#222e42] text-slate-300'
                  }`}
                >
                  {showChartButtons ? 'Shown' : 'Hidden'}
                </button>
              </div>

              {/* Order Placement Notification Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-[#1e2a3d]">
                <div>
                  <div className="font-bold text-slate-200 text-xs">Trade Order Notification</div>
                  <div className="text-[10px] text-slate-400">Popup toast when placing trade (Default OFF)</div>
                </div>
                <button
                  onClick={() => setShowOrderToastEnabled(!showOrderToastEnabled)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    showOrderToastEnabled
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-[#222e42] text-slate-400'
                  }`}
                >
                  {showOrderToastEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Sound FX Audio Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-[#1e2a3d]">
                <div className="flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  )}
                  <div>
                    <div className="font-bold text-slate-200 text-xs">Sound FX Audio</div>
                    <div className="text-[10px] text-slate-400">Audio chime on trade win, loss & orders</div>
                  </div>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    soundEnabled
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-[#222e42] text-slate-400'
                  }`}
                >
                  {soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* SECTION 3: Pen Tool Quick Launch */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-bold text-white text-xs">Pen Tool (Draw Custom Line)</div>
                    <div className="text-[10px] text-slate-400">Draw lines yourself directly on chart</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setActiveDrawingTool(activeDrawingTool === 'rectangle' ? 'none' : 'rectangle');
                      setShowThreeLineMenu(false);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-black text-xs cursor-pointer flex items-center gap-1"
                    title="Draw Rectangle / Square Zone"
                  >
                    <Square className="w-3 h-3" />
                    <span>Square</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveDrawingTool(activeDrawingTool === 'none' ? 'trendline' : 'none');
                      setShowThreeLineMenu(false);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    Line
                  </button>
                </div>
              </div>
              {drawnLines.length > 0 && (
                <button
                  onClick={clearDrawnLines}
                  className="w-full py-1.5 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-300 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Drawn Lines ({drawnLines.length})</span>
                </button>
              )}
            </div>

            {/* SECTION 4: Candle Color Scheme Quick Selector */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span>Candle Color Scheme</span>
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {(Object.keys(CANDLE_COLOR_SCHEMES) as CandleColorScheme[]).map((schemeKey) => {
                  const palette = CANDLE_COLOR_SCHEMES[schemeKey];
                  const active = candleColorScheme === schemeKey;
                  return (
                    <button
                      key={schemeKey}
                      onClick={() => setCandleColorScheme(schemeKey)}
                      className={`px-2.5 py-2 rounded-lg border flex items-center justify-between text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#1a263b] border-cyan-400 text-white'
                          : 'bg-[#0d121c] border-[#1f2c40] text-slate-300 hover:bg-[#151e2e]'
                      }`}
                    >
                      <span className="font-bold text-[11px]">{palette.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-xs inline-block"
                          style={{ backgroundColor: palette.bullish }}
                        />
                        <span
                          className="w-3 h-3 rounded-xs inline-block"
                          style={{ backgroundColor: palette.bearish }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 5: Live Account Money & $100,000+ Purple Crown VIP */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-purple-400" />
                  <span>Live Balance & VIP Crown</span>
                </span>
                <span className="font-mono-num font-bold text-white">
                  {formatCurrency(realBalance)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Cross $100,000 in LIVE to activate Purple LIVE + Crown icon.
              </p>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    removeRealMoney();
                    setAccountType('REAL');
                  }}
                  className="py-2 px-2.5 rounded-lg bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-bold text-[11px] cursor-pointer"
                >
                  Remove Money ($0)
                </button>
                <button
                  onClick={() => {
                    setRealBalanceDirect(105000);
                    setAccountType('REAL');
                  }}
                  className="py-2 px-2.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/50 text-purple-300 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                  <span>Set $105,000 VIP</span>
                </button>
              </div>

              <div className="flex gap-1.5 pt-1">
                <input
                  type="number"
                  placeholder="Enter custom Live $"
                  value={customBalanceInput}
                  onChange={(e) => setCustomBalanceInput(e.target.value)}
                  className="flex-1 bg-[#0d121c] border border-[#25334a] rounded-lg px-2.5 py-1.5 text-white font-mono-num text-xs outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => {
                    const val = parseFloat(customBalanceInput);
                    if (!isNaN(val) && val >= 0) {
                      setRealBalanceDirect(val);
                      setAccountType('REAL');
                      setCustomBalanceInput('');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs cursor-pointer"
                >
                  Set $
                </button>
              </div>
            </div>

            {/* SECTION 6: Leaderboard Trader Name & Position Setup */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Leaderboard Profile</span>
                </span>
                {onOpenLeaderboard && (
                  <button
                    onClick={() => {
                      setShowThreeLineMenu(false);
                      onOpenLeaderboard();
                    }}
                    className="text-[10px] text-cyan-400 hover:underline font-bold cursor-pointer"
                  >
                    Open Board →
                  </button>
                )}
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Your Trader Name:</label>
                <input
                  type="text"
                  value={traderName}
                  onChange={(e) => setTraderName(e.target.value)}
                  placeholder="YA TRADER"
                  className="w-full bg-[#0d121c] border border-[#25334a] rounded-lg px-2.5 py-1.5 text-white font-bold text-xs outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Country Flag:</label>
                <div className="flex flex-wrap gap-1">
                  {flags.map((flg) => (
                    <button
                      key={flg}
                      onClick={() => setTraderFlag(flg)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm border cursor-pointer ${
                        traderFlag === flg
                          ? 'bg-cyan-500/20 border-cyan-400'
                          : 'bg-[#0d121c] border-[#223049]'
                      }`}
                    >
                      {flg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Your Profit ($):</label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      step="0.01"
                      value={profitInput}
                      onChange={(e) => {
                        setProfitInput(e.target.value);
                        const parsed = parseFloat(e.target.value);
                        if (!isNaN(parsed)) {
                          setCustomLeaderboardProfit(parsed);
                        } else {
                          setCustomLeaderboardProfit(null);
                        }
                      }}
                      className="w-full bg-[#0d121c] border border-[#25334a] rounded-lg px-2 py-1 text-white font-mono-num text-xs outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Your Position:</label>
                  <input
                    type="number"
                    value={rankInput}
                    onChange={(e) => {
                      setRankInput(e.target.value);
                      const parsed = parseInt(e.target.value, 10);
                      if (!isNaN(parsed) && parsed > 0) {
                        setCustomLeaderboardRank(parsed);
                      } else {
                        setCustomLeaderboardRank(null);
                      }
                    }}
                    className="w-full bg-[#0d121c] border border-[#25334a] rounded-lg px-2 py-1 text-white font-mono-num text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 7: Chart Watermark & Background Customization (Restoring all background options + adjustable watermark) */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Chart Watermark & Background</span>
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                  {watermarkSize}px • {Math.round(watermarkOpacity * 100)}%
                </span>
              </div>

              {/* Watermark Size Slider */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 font-semibold mb-1">
                  <span>Watermark Size (Adjustment):</span>
                  <span className="text-cyan-400 font-mono font-bold">{watermarkSize}px</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="10"
                  value={watermarkSize}
                  onChange={(e) => setWatermarkSize(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-[#0e1420] rounded-lg"
                />
                <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
                  <span>Small (50px)</span>
                  <span>Standard (160px)</span>
                  <span>Large (350px)</span>
                </div>
              </div>

              {/* Watermark Opacity Slider */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 font-semibold mb-1">
                  <span>Watermark Visibility (Opacity):</span>
                  <span className="text-cyan-400 font-mono font-bold">{Math.round(watermarkOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.03"
                  max="0.5"
                  step="0.01"
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-[#0e1420] rounded-lg"
                />
              </div>

              {/* Watermark Display Mode */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Watermark Elements:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['both', 'logo', 'text'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setWatermarkType(mode)}
                      className={`py-1 px-2 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        watermarkType === mode
                          ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                          : 'bg-[#182233] text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode === 'both' ? 'Logo + Text' : mode === 'logo' ? 'Logo Only' : 'Text Only'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Watermark Logo URL */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Custom Watermark Logo URL:</label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    placeholder="Paste logo URL (or empty for default)..."
                    value={logoImageUrl}
                    onChange={(e) => setLogoImageUrl(e.target.value)}
                    className="flex-1 bg-[#0d121c] border border-[#25334a] rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none focus:border-cyan-400"
                  />
                  {logoImageUrl && (
                    <button
                      onClick={() => setLogoImageUrl('')}
                      className="px-2 py-1 rounded bg-[#202b3d] hover:bg-rose-900/50 text-slate-300 hover:text-rose-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Default
                    </button>
                  )}
                </div>
              </div>

              {/* Custom Chart Background Image Options (Restored for full flexibility) */}
              <div className="pt-2 border-t border-[#1e2a3d]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] text-slate-300 font-bold block">
                    Custom Chart Background:
                  </label>
                  {backgroundImageUrl && (
                    <button
                      onClick={() => setBackgroundImageUrl('')}
                      className="text-[10px] text-rose-400 hover:underline font-bold cursor-pointer"
                    >
                      Clear Background (Watermark Only)
                    </button>
                  )}
                </div>

                {/* Preset Themes */}
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  <button
                    onClick={() => setBackgroundImageUrl('')}
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      !backgroundImageUrl
                        ? 'bg-[#1b263b] border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-[#0d121c] border-[#1e2a3d] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold">🌑 Clean Dark</div>
                    <div className="text-[9px] text-slate-500">Only Watermark (Default)</div>
                  </button>

                  <button
                    onClick={() =>
                      setBackgroundImageUrl(
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80'
                      )
                    }
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      backgroundImageUrl.includes('photo-1550751827')
                        ? 'bg-[#1b263b] border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-[#0d121c] border-[#1e2a3d] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold">🌌 Cyber Grid</div>
                    <div className="text-[9px] text-slate-500">Tech Neon Grid</div>
                  </button>

                  <button
                    onClick={() =>
                      setBackgroundImageUrl(
                        'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80'
                      )
                    }
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      backgroundImageUrl.includes('photo-1506703719')
                        ? 'bg-[#1b263b] border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-[#0d121c] border-[#1e2a3d] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold">🪐 Deep Space</div>
                    <div className="text-[9px] text-slate-500">Blue Galaxy Theme</div>
                  </button>

                  <button
                    onClick={() =>
                      setBackgroundImageUrl(
                        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80'
                      )
                    }
                    className={`p-1.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      backgroundImageUrl.includes('photo-1618005182')
                        ? 'bg-[#1b263b] border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-[#0d121c] border-[#1e2a3d] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold">💎 AMOLED Carbon</div>
                    <div className="text-[9px] text-slate-500">Dark Wave Minimal</div>
                  </button>
                </div>

                <input
                  type="url"
                  placeholder="Or paste direct custom background URL..."
                  value={backgroundImageUrl}
                  onChange={(e) => setBackgroundImageUrl(e.target.value)}
                  className="w-full bg-[#0d121c] border border-[#25334a] rounded-lg px-2.5 py-1.5 text-white font-mono text-xs outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* SECTION 8: Timeframe & Engine Status */}
            <div className="bg-[#141c2b] border border-[#223049] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-bold text-white text-xs">Candle Timeframe</div>
                  <div className="text-[10px] text-slate-400">Fixed 1-Minute per candle (Locked)</div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold bg-[#00e599]/20 text-[#00e599] border border-[#00e599]/30 px-2 py-0.5 rounded">
                1m Candle
              </span>
            </div>
          </div>

          {/* Drawer Sticky Footer with smooth action */}
          <div className="p-3 bg-[#111723] border-t border-[#1f2a3c] shrink-0">
            <button
              onClick={() => setShowThreeLineMenu(false)}
              className="w-full py-2.5 rounded-xl bg-[#00e599] hover:bg-[#00d084] active:scale-[0.99] text-slate-950 font-black text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Done & Return to Chart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
