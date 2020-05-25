import React from 'react';
import './App.css';

import moment from 'moment';
import { ScheduledJobsViewer } from './scheduled-jobs-viewer';

const dayBegin = moment().startOf('day').add(-1, 'minute');
const dayEnd = moment().startOf('day').add(24, 'hour');

const csvInput = `GroupName;Title;CronExpression;DurationInMinutes
Gateway Scheduled Jobs;Cleanup unused underlying quotes;0 23 * * SAT;1
Gateway Scheduled Jobs;wikifolio Fee-Berechnung;5 2 * * *;67
Gateway Scheduled Jobs;wikifolio Snapshots an Core senden;45 1 * * *;7
Gateway Scheduled Jobs;wikifolio emitieren;30 5 * * *;1
Gateway Scheduled Jobs;Underlying Basisdaten importieren;5 5 * * *;3
Gateway Scheduled Jobs;Underlying Basisdaten (UBS only) importieren;0 6 * * *;10
Gateway Scheduled Jobs;Underlying Basisdaten (SG only) importieren;5 3 * * *;11
Gateway Scheduled Jobs;Expiry Sell Orders;45 15 * * *;1
Hangfire Jobs;ImportAutoContentFeedToElasticsearch;0 3 * * *;1
Hangfire Jobs;CreateUmbracoSitemap;30 7 * * *;6
Hangfire Jobs;GenerateWikifolioEmissionFeaturedDoc;0 10 29 2 0;1
Hangfire Jobs;EmissionStart;5 9 * * *;1
Hangfire Jobs;NotifyLimitOrderExpiration;3 7 * * *;1
Hangfire Jobs;NotifyRealMoneyInvestor;12 7 * * *;1
Hangfire Jobs;NotifyLegitimation;9 7 * * *;1
Hangfire Jobs;GenerateProfitLossReport;36 7 * * *;12
Hangfire Jobs;CreateIUDocument;9 7 * * *;4
Hangfire Jobs;NotifyIssuingProcessPreparation;6 7 * * *;1
Hangfire Jobs;NotifyUnderlyingExpirationIn2Days;0 8 * * *;1
Hangfire Jobs;NotifyUnderlyingExpirationIn8Days;0 8 * * TUE;1
Hangfire Jobs;NotifyUnderlyingExpiryNotSold;39 7 * * *;1
Hangfire Jobs;RiskCalculationCalculateUnderlyingCovariance;30 5 * * *;59
Hangfire Jobs;VwdImportIndexPriceData;15 6 * * *;1
Hangfire Jobs;VwdImportUnderlyingPrices;30 4 * * *;11
Hangfire Jobs;RiskCalculationCalculateWikifolioRisk;45 6 * * *;1
Hangfire Jobs;RiskCalculationCalculateBenchmark;30 6 * * *;1
Hangfire Jobs;NegativeCashNotificationCleanup;30 23 * * *;1
Hangfire Jobs;NegativeCashMarketOpsNotification;10 9 * * *;1
Hangfire Jobs;NegativeCashTraderNotification;10 8 * * *;1
Hangfire Jobs;WikifolioTagCacheRefresh;20 7 * * *;1
Hangfire Jobs;GeneratePriipsProxyReport;5 0 * * *;2
Hangfire Jobs;UploadAndPublishWikifoliosToRssFeed;0 * * * *;1
Hangfire Jobs;InterlinkingCacheRefresh;0 * * * *;1
Hangfire Jobs;GeneratePriipsWikifolioReport;5 0 * * *;1
Hangfire Jobs;UploadAndPublishContentToRssFeed;0 * * * *;1
Hangfire Jobs;WatchlistedWikifolioNotification;*/5 * * * *;1
Hangfire Jobs;AggregateUnderlyingSentiments;20 0 * * *;3
Hangfire Jobs;AggregateUnderlyingTransactions;10 0 * * *;6
Hangfire Jobs;UnderlyingStdDeviationsRecalculateAndCache;0 5 * * *;1
Hangfire Jobs;GenerateChartImages;30 0 * * *;62
Hangfire Jobs;SynchronizeWikifolios;0 1 * * *;3
Hangfire Jobs;WallstreetOnlineImportTickData;30 0 * * *;45
Hangfire Jobs;UnderlyingPopularity;45 2 * * *;2
Hangfire Jobs;AggregateAndStoreHeroTrades;0 4 * * *;2
Hangfire Jobs;MarketMonitor;30 6 * * *;4
Hangfire Jobs;AssignPromotionCodeToUse;30 * * * *;1
Hangfire Jobs;SyncMissingWikifolioFees;30 6 * * *;5
Hangfire Jobs;AssignSegmentToUser;0 5 * * *;1
Hangfire Jobs;CopyChallengeLegRankingValueToHistory;0 2 * * *;1
Hangfire Jobs;ExportMasterdataToStockExchangeStuttgart;0 7 * * *;1
Hangfire Jobs;CalculateChallengeLegRankingValue;*/15 7-23 * * *;1
Hangfire Jobs;RankingCacheRefresh;0 6-23 * * *;6
Hangfire Jobs;VwdCleanHistoricData;50 23 * * *;1
Hangfire Jobs;SearchServiceRankingsInvestableWikifoliosUpdate;*/5 6-23 * * *;1
Hangfire Jobs;SearchServiceRankingsPublishedWikifoliosUpdate;*/30 6-23 * * *;1
Hangfire Jobs;SearchServiceWikifolioTagsUpdate;30 6 * * *;2
Hangfire Jobs;ImportAutoContentFeedToElasticsearch;0 3 * * *;1
Hangfire Jobs;WikifolioDailyImport;50 2 * * *;2
Hangfire Jobs;StoreModuleTrackingDataToDatabase;1 0 * * *;1
Hangfire Jobs;SaveUserActivityLogToDatabase;1 2 * * *;1
Hangfire Jobs;SuperWikifolioMinItemQuantityHistory;30 3 * * *;3
Hangfire Jobs;DeleteMarkedTestWikifolios;0 3 * * *;2
Hangfire Jobs;ExecuteAutoContent;0 2 * * *;1
Hangfire Jobs;ManualMonster;0 12 29 2 *;1
SQL Jobs;CalculatePerformances;0 7 * * MON,TUE,WED,THU,FRI;1
SQL Jobs;CalculateRanking;0 5 * * *;63
SQL Jobs;CalculateTraderLifecyclePosition;20 0 * * *;1
SQL Jobs;CleanCoreProduction;55 0 * * *;8
SQL Jobs;CleanRankingValueHistory;0 0 * * *;1
SQL Jobs;CleanSnapshotTables;10 5 * * *;4
SQL Jobs;CleanUnderlyingTickDataAggregated;0 0 * * *;27
SQL Jobs;CleanUnusedUnderlyingsJob;30 0 * * SAT;12
SQL Jobs;CleanWikifolioRankingValues;30 23 * * 5;1
SQL Jobs;CopySnapshotDataToArchive;0 6 * * *;2
SQL Jobs;LoadWikifolioStatePrices;45 1 * * *;3
SQL Jobs;MoveChallengeRankingsToHistory;0 1 * * *;2
SQL Jobs;MoveCurrencyTickDataToHistory;4 0 * * *;1
SQL Jobs;MoveUnderlyingTickDataToHistory;34 0 * * *;6
SQL Jobs;MoveWikifolioTickDataToHistory;30 3 * * *;20
SQL Jobs;QA_Archive_PerformRetentionCleanup;45 23 * * *;3
SQL Jobs;ResetRealMoneyInvestor;0 7 * * *;1
SQL Jobs;SAT_CalculateTags-DividedIntoSteps;0 4 * * *;20
SQL Jobs;syspolicy_purge_history;0 2 * * *;1
SQL Jobs;TDA_CleanWikifolioTickDataAggregated;15 1 * * *;4
SQL Jobs;UpdateUnderlyingPartnerLinkForWoUsers;0 4 * * *;1`

function App() {
  return (
    <div className="App">
      <ScheduledJobsViewer csvInput={csvInput} dayBegin={dayBegin} dayEnd={dayEnd}/>
    </div>
  );
}

export default App;
