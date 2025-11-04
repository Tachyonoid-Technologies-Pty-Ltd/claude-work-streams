# Stream Archive Management Diagrams
## Visual Workflows and Process Documentation

**Document Purpose:** Provide comprehensive visual representations of archive management workflows, processes, and structures using Mermaid diagrams.

**Target Audience:** Developers and teams implementing or using archive management features.

**Companion Document:** [Stream Archive Management Guide](./stream-archive-management.md)

**Version:** 1.0.0
**Date:** 2025-11-03
**Status:** Complete

---

## Table of Contents

1. [Archive Process Flow](#1-archive-process-flow)
2. [Archive Directory Structure](#2-archive-directory-structure)
3. [Archive Decision Tree](#3-archive-decision-tree)
4. [Unarchive and Recovery Process](#4-unarchive-and-recovery-process)
5. [Archive Maintenance Schedule](#5-archive-maintenance-schedule)
6. [Search and Discovery Flow](#6-search-and-discovery-flow)
7. [Archive Index Management](#7-archive-index-management)
8. [Archive Metadata Relationships](#8-archive-metadata-relationships)
9. [Archive Integrity Check Process](#9-archive-integrity-check-process)
10. [Statistics Generation Flow](#10-statistics-generation-flow)
11. [Manual Archive Process](#11-manual-archive-process)
12. [Archive File Lifecycle](#12-archive-file-lifecycle)

---

## 1. Archive Process Flow

**Description:** Complete workflow from active stream to archived state, showing all steps and file operations.

```mermaid
flowchart TD
    Start([Active Stream]) --> Decision{Archive Trigger}

    Decision -->|stream-end --archive| Auto[Automatic Archive]
    Decision -->|stream-archive command| Manual[Manual Archive]

    Auto --> CheckStatus{Check Stream Status}
    Manual --> ValidateReason[Validate Archive Reason]

    CheckStatus -->|completed| ProceedAuto[Proceed with Archive]
    CheckStatus -->|not completed| Error1[Error: Stream not complete]

    ValidateReason -->|30+ days pause| ProceedManual[Proceed with Archive]
    ValidateReason -->|consolidation| ProceedManual
    ValidateReason -->|restructuring| ProceedManual
    ValidateReason -->|invalid reason| Error2[Error: Invalid reason]

    ProceedAuto --> CreateDir[Create Archive Directory]
    ProceedManual --> CreateDir

    CreateDir --> CopyFiles[Copy Stream Files]
    CopyFiles --> CopyStreamYaml[Copy stream.yaml]
    CopyStreamYaml --> CopyVersions[Copy versions/ directory]
    CopyVersions --> CopyMetadata[Copy metadata.yaml]

    CopyMetadata --> GenerateMeta[Generate archive-metadata.yaml]
    GenerateMeta --> CalcStats[Calculate Statistics]
    CalcStats --> WriteArchiveMeta[Write Archive Metadata]

    WriteArchiveMeta --> UpdateIndex[Update Archive Index]
    UpdateIndex --> AddEntry[Add Entry to README.md]
    AddEntry --> UpdateStats[Update Statistics Section]

    UpdateStats --> RemoveActive{Remove from Active?}
    RemoveActive -->|Yes| DeleteActive[Delete from Active Directory]
    RemoveActive -->|No keep active| SkipDelete[Keep in Active]

    DeleteActive --> UpdateCurrent{Was Active Stream?}
    SkipDelete --> GitCommit[Git Commit]

    UpdateCurrent -->|Yes| ClearCurrent[Update .current-stream]
    UpdateCurrent -->|No| GitCommit

    ClearCurrent --> GitCommit
    GitCommit --> GitAdd[git add archive/stream-name/]
    GitAdd --> GitCommitMsg[git commit with message]
    GitCommitMsg --> GitTag[git tag stream-name-archived]

    GitTag --> Complete([Archive Complete])
    Error1 --> Failed([Archive Failed])
    Error2 --> Failed

    style Start fill:#e1f5ff
    style Complete fill:#c8e6c9
    style Failed fill:#ffcdd2
    style CreateDir fill:#fff9c4
    style GenerateMeta fill:#fff9c4
    style UpdateIndex fill:#fff9c4
    style GitCommit fill:#ffe0b2
```

---

## 2. Archive Directory Structure

**Description:** Hierarchical representation of archive directory structure with file descriptions.

```mermaid
graph TD
    Root[.claude/streams/archive/]

    Root --> README[README.md<br/>Archive index and guide]
    Root --> SearchIndex[SEARCH-INDEX.md<br/>Optional search index]
    Root --> Stream1[stream-1/<br/>Completed stream]
    Root --> Stream2[stream-2/<br/>Paused stream]
    Root --> Stream3[stream-3/<br/>Completed stream]

    Stream1 --> S1_StreamYaml[stream.yaml<br/>Final version]
    Stream1 --> S1_Versions[versions/<br/>Version history]
    Stream1 --> S1_Metadata[metadata.yaml<br/>Original metadata]
    Stream1 --> S1_ArchiveMeta[archive-metadata.yaml<br/>Archive info]

    S1_Versions --> S1_V1[v1.0.0.yaml<br/>Initial version]
    S1_Versions --> S1_V2[v1.1.0.yaml<br/>First checkpoint]
    S1_Versions --> S1_V3[v2.0.0.yaml<br/>Major review]
    S1_Versions --> S1_V4[v2.1.0.yaml<br/>Final version]
    S1_Versions --> S1_Log[VERSION-LOG.md<br/>Human readable log]

    Stream2 --> S2_StreamYaml[stream.yaml<br/>Last version before pause]
    Stream2 --> S2_Versions[versions/<br/>Version history]
    Stream2 --> S2_Metadata[metadata.yaml<br/>Original metadata]
    Stream2 --> S2_ArchiveMeta[archive-metadata.yaml<br/>Archive info with blockers]

    S2_Versions --> S2_V1[v1.0.0.yaml]
    S2_Versions --> S2_V2[v2.0.0.yaml]
    S2_Versions --> S2_V3[v3.0.0.yaml]
    S2_Versions --> S2_V4[v3.1.0.yaml<br/>Paused at this version]
    S2_Versions --> S2_Log[VERSION-LOG.md]

    style Root fill:#e3f2fd
    style README fill:#c8e6c9
    style SearchIndex fill:#c8e6c9
    style S1_StreamYaml fill:#fff9c4
    style S2_StreamYaml fill:#fff9c4
    style S1_ArchiveMeta fill:#ffe0b2
    style S2_ArchiveMeta fill:#ffe0b2
    style S1_Versions fill:#f3e5f5
    style S2_Versions fill:#f3e5f5
```

---

## 3. Archive Decision Tree

**Description:** Decision logic for when and how to archive streams.

```mermaid
flowchart TD
    Start([Stream Status Check]) --> Status{Stream Status?}

    Status -->|completed| Completed[Stream Completed]
    Status -->|paused| Paused[Stream Paused]
    Status -->|active| Active[Stream Active]

    Completed --> AllGoals{All Goals Achieved?}
    AllGoals -->|Yes| AutoArchive[Archive Automatically<br/>via stream-end --archive]
    AllGoals -->|No| Review[Review Goals]

    Paused --> Duration{Inactive Duration?}
    Duration -->|Under 30 days| KeepActive1[Keep in Active Directory]
    Duration -->|30-60 days| Consider[Consider Archiving]
    Duration -->|Over 60 days| ShouldArchive[Should Archive]

    Consider --> Blockers{Blockers Resolved?}
    Blockers -->|Yes| Resume[Resume Stream]
    Blockers -->|No| ManualArchive1[Archive Manually<br/>via stream-archive]

    ShouldArchive --> ManualArchive1

    Active --> Special{Special Case?}
    Special -->|Consolidation| Consolidate[Merging into Another Stream]
    Special -->|Restructuring| Restructure[Major Rewrite Needed]
    Special -->|None| KeepActive2[Keep Active]

    Consolidate --> ManualArchive2[Archive with Reason:<br/>consolidation]
    Restructure --> ManualArchive3[Archive with Reason:<br/>restructuring]

    AutoArchive --> Process[Execute Archive Process]
    ManualArchive1 --> Process
    ManualArchive2 --> Process
    ManualArchive3 --> Process

    Process --> IndexUpdate[Update Archive Index]
    IndexUpdate --> Done([Archived])

    KeepActive1 --> Monitor[Monitor Status]
    KeepActive2 --> Monitor
    Resume --> Unarchive[Use stream-resume]
    Review --> UpdateGoals[Update Goals]

    Monitor --> End1([No Action])
    Unarchive --> End2([Stream Active])
    UpdateGoals --> End3([Continue Work])

    style Start fill:#e1f5ff
    style Done fill:#c8e6c9
    style End1 fill:#f5f5f5
    style End2 fill:#c8e6c9
    style End3 fill:#c8e6c9
    style Process fill:#fff9c4
    style AutoArchive fill:#b2dfdb
    style ManualArchive1 fill:#ffccbc
    style ManualArchive2 fill:#ffccbc
    style ManualArchive3 fill:#ffccbc
```

---

## 4. Unarchive and Recovery Process

**Description:** Workflow for restoring archived streams back to active directory.

```mermaid
flowchart TD
    Start([Recovery Request]) --> Method{Recovery Method?}

    Method -->|Command| UseCommand[/stream-unarchive stream-name]
    Method -->|Manual| ManualProcess[Manual Recovery Process]
    Method -->|Git Restore| GitRestore[Git History Restore]

    UseCommand --> VerifyArchive{Archive Exists?}
    VerifyArchive -->|Yes| CheckConflict{Active Stream<br/>with Same Name?}
    VerifyArchive -->|No| ErrorNotFound[Error: Archive not found]

    CheckConflict -->|Yes| ConflictResolution{Resolution Strategy?}
    CheckConflict -->|No| ProceedUnarchive[Proceed with Unarchive]

    ConflictResolution -->|Rename Active| RenameActive[Rename Active Stream]
    ConflictResolution -->|Rename Unarchived| RenameUnarchived[Unarchive with New Name]
    ConflictResolution -->|Cancel| CancelOperation[Cancel Unarchive]

    RenameActive --> ProceedUnarchive
    RenameUnarchived --> ProceedUnarchive

    ProceedUnarchive --> CopyFromArchive[Copy from Archive to Active]
    CopyFromArchive --> CopyStream[Copy stream.yaml]
    CopyStream --> CopyVersions[Copy versions/ directory]
    CopyVersions --> CopyMeta[Copy metadata.yaml]

    CopyMeta --> RemoveArchiveMeta[Remove archive-metadata.yaml]
    RemoveArchiveMeta --> UpdateStatus{Original Status?}

    UpdateStatus -->|completed| AskVersion[Prompt: Start New Version?]
    UpdateStatus -->|paused| CheckBlockers[Check Blockers in Metadata]

    AskVersion -->|Keep Current| KeepVersion[Status: completed<br/>Read-only reference]
    AskVersion -->|New Major| CreateMajor[Create New Major Version<br/>Status: active]
    AskVersion -->|Resume As-Is| ResumeCompleted[Status: active<br/>Same version]

    CheckBlockers --> BlockersInfo[Display Blocker Information]
    BlockersInfo --> ResumeDecision[Resume Instructions from Metadata]
    ResumeDecision --> SetActive[Status: active]

    KeepVersion --> UpdateCurrent1[Update .current-stream]
    CreateMajor --> UpdateCurrent1
    ResumeCompleted --> UpdateCurrent1
    SetActive --> UpdateCurrent1

    UpdateCurrent1 --> UpdateIndex[Update Archive Index]
    UpdateIndex --> RemoveEntry[Remove Entry from Archive README]
    RemoveEntry --> UpdateStatsArchive[Update Archive Statistics]

    UpdateStatsArchive --> GitCommitRestore[Git Commit]
    GitCommitRestore --> GitAddActive[git add streams/stream-name/]
    GitAddActive --> GitCommitMsg[git commit: Unarchive stream-name]

    GitCommitMsg --> Complete([Recovery Complete])

    ManualProcess --> ManualStep1[mkdir -p streams/stream-name]
    ManualStep1 --> ManualStep2[cp -r archive/stream-name/* streams/stream-name/]
    ManualStep2 --> ManualStep3[rm streams/stream-name/archive-metadata.yaml]
    ManualStep3 --> ManualStep4[Update stream.yaml status]
    ManualStep4 --> ManualStep5[echo stream-name > .current-stream]
    ManualStep5 --> ManualStep6[Update archive README]
    ManualStep6 --> ManualCommit[Git commit changes]
    ManualCommit --> Complete

    GitRestore --> FindCommit[git log --all -- archive/stream-name/]
    FindCommit --> Checkout[git checkout commit-hash -- archive/stream-name/]
    Checkout --> RestoreCommit[git commit: Restore from git]
    RestoreCommit --> FollowUnarchive[Follow Unarchive Process]
    FollowUnarchive --> Complete

    ErrorNotFound --> Failed([Recovery Failed])
    CancelOperation --> Cancelled([Operation Cancelled])

    style Start fill:#e1f5ff
    style Complete fill:#c8e6c9
    style Failed fill:#ffcdd2
    style Cancelled fill:#f5f5f5
    style CopyFromArchive fill:#fff9c4
    style UpdateIndex fill:#fff9c4
    style GitCommitRestore fill:#ffe0b2
```

---

## 5. Archive Maintenance Schedule

**Description:** Timeline showing regular maintenance tasks (weekly, monthly, quarterly).

```mermaid
gantt
    title Archive Maintenance Schedule
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Weekly Tasks
    Update Archive Index           :w1, 2025-11-03, 1d
    Check Archive Integrity        :w2, 2025-11-03, 1d
    Update Archive Index           :w3, 2025-11-10, 1d
    Check Archive Integrity        :w4, 2025-11-10, 1d
    Update Archive Index           :w5, 2025-11-17, 1d
    Check Archive Integrity        :w6, 2025-11-17, 1d
    Update Archive Index           :w7, 2025-11-24, 1d
    Check Archive Integrity        :w8, 2025-11-24, 1d

    section Monthly Tasks
    Archive Statistics Review      :m1, 2025-11-03, 2d
    Cleanup Old Paused Streams     :m2, 2025-11-05, 2d
    Archive Statistics Review      :m3, 2025-12-03, 2d
    Cleanup Old Paused Streams     :m4, 2025-12-05, 2d

    section Quarterly Tasks
    Archive Audit                  :q1, 2025-11-03, 3d
    Verify Git Tags                :q2, 2025-11-06, 2d
    Check Version Completeness     :q3, 2025-11-08, 2d
    Archive Index Reorganization   :q4, 2025-11-10, 3d
    Update Categorization          :q5, 2025-11-13, 1d
    Add Cross-references           :q6, 2025-11-14, 1d
```

---

## 6. Search and Discovery Flow

**Description:** Process flow for finding and filtering archived streams.

```mermaid
flowchart TD
    Start([Search Request]) --> SearchType{Search Criteria Type?}

    SearchType -->|Status| ByStatus[Search by Status]
    SearchType -->|Date Range| ByDate[Search by Date]
    SearchType -->|Tags| ByTags[Search by Tags]
    SearchType -->|Duration| ByDuration[Search by Duration]
    SearchType -->|Goals| ByGoals[Search by Goal Count]
    SearchType -->|Multiple| MultiCriteria[Multi-Criteria Search]

    ByStatus --> StatusQuery{Status Type?}
    StatusQuery -->|completed| GrepCompleted[grep 'final_status: completed'<br/>archive/*/archive-metadata.yaml]
    StatusQuery -->|paused| GrepPaused[grep 'final_status: paused'<br/>archive/*/archive-metadata.yaml]

    ByDate --> DateQuery{Date Range?}
    DateQuery -->|Specific Month| GrepMonth[grep 'archived_date: 2025-11'<br/>archive/*/archive-metadata.yaml]
    DateQuery -->|Last N Days| FindRecent[find archive/ -name<br/>archive-metadata.yaml -mtime -30]

    ByTags --> TagQuery{Single or Multiple?}
    TagQuery -->|Single Tag| GrepSingleTag[grep -l 'tag-name'<br/>archive/*/archive-metadata.yaml]
    TagQuery -->|Multiple AND| GrepMultipleTags[grep -l 'tag1' | xargs grep -l 'tag2']

    ByDuration --> DurationQuery{Duration Range?}
    DurationQuery -->|Short under 7| AwkShort[grep duration_days | awk '$2 < 7']
    DurationQuery -->|Medium 7-14| AwkMedium[grep duration_days | awk '$2 >= 7 && $2 <= 14']
    DurationQuery -->|Long over 14| AwkLong[grep duration_days | awk '$2 > 14']

    ByGoals --> GoalQuery{Goal Count Threshold?}
    GoalQuery -->|Few under 5| AwkFewGoals[grep goals_total | awk '$2 < 5']
    GoalQuery -->|Many over 10| AwkManyGoals[grep goals_total | awk '$2 >= 10']

    MultiCriteria --> Combine[Combine Multiple grep/awk Commands]
    Combine --> Pipeline[Build Search Pipeline]

    GrepCompleted --> Results[Collect Results]
    GrepPaused --> Results
    GrepMonth --> Results
    FindRecent --> Results
    GrepSingleTag --> Results
    GrepMultipleTags --> Results
    AwkShort --> Results
    AwkMedium --> Results
    AwkLong --> Results
    AwkFewGoals --> Results
    AwkManyGoals --> Results
    Pipeline --> Results

    Results --> Format{Output Format?}
    Format -->|List Files| ListFiles[List Matching Files]
    Format -->|Show Metadata| ExtractMetadata[yq Extract Metadata]
    Format -->|Count Only| CountResults[wc -l Count Results]
    Format -->|Full Details| FullDetails[cat Full Archive Entries]

    ListFiles --> Display[Display Results]
    ExtractMetadata --> Display
    CountResults --> Display
    FullDetails --> Display

    Display --> UseSearchIndex{Use Search Index?}
    UseSearchIndex -->|Yes| UpdateIndex[Update SEARCH-INDEX.md]
    UseSearchIndex -->|No| SkipIndex[Results Only]

    UpdateIndex --> Complete([Search Complete])
    SkipIndex --> Complete

    style Start fill:#e1f5ff
    style Complete fill:#c8e6c9
    style Results fill:#fff9c4
    style Display fill:#b2dfdb
```

---

## 7. Archive Index Management

**Description:** Workflow for creating and maintaining the archive README.md index.

```mermaid
flowchart TD
    Start([Index Management]) --> Action{Action Type?}

    Action -->|Initialize| InitIndex[Initialize Archive Index]
    Action -->|Add Entry| AddEntry[Add New Archive Entry]
    Action -->|Update Stats| UpdateStats[Update Statistics]
    Action -->|Reorganize| Reorganize[Reorganize Index]

    InitIndex --> CreateFile[Create archive/README.md]
    CreateFile --> AddSections[Add Standard Sections]
    AddSections --> PurposeSection[Purpose Section]
    PurposeSection --> StructureSection[Structure Section]
    StructureSection --> ArchivesSection[Current Archives Section]
    ArchivesSection --> StatsSection[Statistics Section]
    StatsSection --> HowToSection[How to Use Section]
    HowToSection --> RelatedDocsSection[Related Documentation Section]
    RelatedDocsSection --> InitComplete[Initialize Complete]

    AddEntry --> GetMetadata[Read archive-metadata.yaml]
    GetMetadata --> ExtractInfo[Extract Information]
    ExtractInfo --> StreamName[Stream Name]
    StreamName --> FinalVersion[Final Version]
    FinalVersion --> ArchiveDate[Archive Date]
    ArchiveDate --> StatusInfo[Status]
    StatusInfo --> DurationInfo[Duration]
    DurationInfo --> SessionsInfo[Sessions Count]
    SessionsInfo --> SummaryInfo[Summary]
    SummaryInfo --> TagsInfo[Tags]

    TagsInfo --> FormatEntry[Format Entry Template]
    FormatEntry --> InsertEntry[Insert into Current Archives Section]
    InsertEntry --> SortEntries{Sort By?}
    SortEntries -->|Date Recent First| SortByDate[Sort by Archive Date DESC]
    SortEntries -->|Alphabetical| SortAlpha[Sort Alphabetically]
    SortEntries -->|Status| SortStatus[Group by Status]

    SortByDate --> EntryComplete[Entry Added]
    SortAlpha --> EntryComplete
    SortStatus --> EntryComplete

    UpdateStats --> CountStreams[Count Archived Streams]
    CountStreams --> CountVersions[Count Total Versions]
    CountVersions --> CalcHours[Calculate Total Hours]
    CalcHours --> CalcAverage[Calculate Averages]
    CalcAverage --> StatusDist[Calculate Status Distribution]
    StatusDist --> CreateTable[Create Statistics Table]
    CreateTable --> UpdateStatsSection[Update Statistics Section]
    UpdateStatsSection --> UpdateTimestamp[Update Last Updated Date]
    UpdateTimestamp --> StatsComplete[Statistics Updated]

    Reorganize --> ReviewStructure[Review Current Structure]
    ReviewStructure --> GroupByStatus{Group by Status?}
    GroupByStatus -->|Yes| CreateStatusGroups[Create Status Sections]
    GroupByStatus -->|No| GroupByDate{Group by Date?}

    CreateStatusGroups --> CompletedGroup[Completed Streams Section]
    CompletedGroup --> PausedGroup[Paused Streams Section]

    GroupByDate -->|Yes| CreateDateGroups[Create Date Sections]
    GroupByDate -->|No| GroupByTags{Group by Tags?}

    CreateDateGroups --> YearMonthGroups[Year-Month Sections]

    GroupByTags -->|Yes| CreateTagGroups[Create Tag Sections]
    GroupByTags -->|No| KeepCurrent[Keep Current Structure]

    CreateTagGroups --> TagCategories[Tag Category Sections]

    PausedGroup --> AddCrossRefs[Add Cross-References]
    YearMonthGroups --> AddCrossRefs
    TagCategories --> AddCrossRefs
    KeepCurrent --> AddCrossRefs

    AddCrossRefs --> LinkRelated[Link Related Streams]
    LinkRelated --> LinkDocs[Link Documentation]
    LinkDocs --> ReorgComplete[Reorganization Complete]

    InitComplete --> Commit[Git Commit Changes]
    EntryComplete --> Commit
    StatsComplete --> Commit
    ReorgComplete --> Commit

    Commit --> GitAdd[git add archive/README.md]
    GitAdd --> GitCommitMsg[git commit: Update archive index]
    GitCommitMsg --> Done([Index Updated])

    style Start fill:#e1f5ff
    style Done fill:#c8e6c9
    style InitComplete fill:#b2dfdb
    style EntryComplete fill:#b2dfdb
    style StatsComplete fill:#b2dfdb
    style ReorgComplete fill:#b2dfdb
    style FormatEntry fill:#fff9c4
    style CreateTable fill:#fff9c4
```

---

## 8. Archive Metadata Relationships

**Description:** Entity relationship diagram showing how archive files relate to each other.

```mermaid
erDiagram
    ARCHIVE-DIRECTORY ||--o{ STREAM-ARCHIVE : contains
    ARCHIVE-DIRECTORY ||--|| README : has
    ARCHIVE-DIRECTORY ||--o| SEARCH-INDEX : optionally-has

    STREAM-ARCHIVE ||--|| STREAM-YAML : contains
    STREAM-ARCHIVE ||--|| VERSIONS-DIR : contains
    STREAM-ARCHIVE ||--|| METADATA-YAML : contains
    STREAM-ARCHIVE ||--|| ARCHIVE-METADATA : contains

    VERSIONS-DIR ||--o{ VERSION-FILE : contains
    VERSIONS-DIR ||--|| VERSION-LOG : contains

    STREAM-YAML ||--|| VERSION-INFO : includes
    STREAM-YAML ||--o{ CHECKPOINT : includes
    STREAM-YAML ||--o{ UPDATE : includes
    STREAM-YAML ||--o{ GOAL : includes
    STREAM-YAML ||--o| CONTEXT : includes

    ARCHIVE-METADATA ||--|| STATISTICS : contains
    ARCHIVE-METADATA ||--o{ VERSION-SUMMARY : contains
    ARCHIVE-METADATA ||--o{ SESSION-SUMMARY : contains
    ARCHIVE-METADATA ||--o{ RELATED-STREAM : references
    ARCHIVE-METADATA ||--o{ TAG : contains
    ARCHIVE-METADATA ||--|| RESUME-INSTRUCTIONS : contains

    METADATA-YAML ||--|| CREATION-INFO : contains
    METADATA-YAML ||--|| TEMPLATE-INFO : contains
    METADATA-YAML ||--o{ TAG : contains

    README ||--o{ ARCHIVE-ENTRY : lists
    README ||--|| ARCHIVE-STATISTICS : contains

    ARCHIVE-ENTRY ||--|| STREAM-ARCHIVE : references

    ARCHIVE-DIRECTORY {
        string path
        int stream_count
        int total_versions
    }

    STREAM-ARCHIVE {
        string name
        string final_version
        string status
        date archived_date
    }

    STREAM-YAML {
        string name
        string version
        string status
        string description
    }

    ARCHIVE-METADATA {
        string name
        timestamp archived_date
        string archived_reason
        string final_version
        string final_status
    }

    METADATA-YAML {
        timestamp created
        string template
        array tags
    }

    VERSION-FILE {
        string version_number
        timestamp created
        string description
    }

    VERSION-LOG {
        string format
        text content
    }

    STATISTICS {
        int duration_days
        int sessions
        int checkpoints
        int versions
        int goals_completed
    }

    README {
        text purpose
        text structure
        int stream_count
    }
```

---

## 9. Archive Integrity Check Process

**Description:** Verification workflow to ensure archive completeness and consistency.

```mermaid
flowchart TD
    Start([Integrity Check]) --> InitCheck[Initialize Integrity Check]

    InitCheck --> ListArchives[List All Archived Streams]
    ListArchives --> IterateArchives{For Each Archive}

    IterateArchives -->|Next Archive| CheckStream[Check Stream Directory]
    IterateArchives -->|All Done| GenerateReport[Generate Report]

    CheckStream --> FileCheck1{stream.yaml exists?}
    FileCheck1 -->|No| LogError1[Log Error: Missing stream.yaml]
    FileCheck1 -->|Yes| FileCheck2{versions/ dir exists?}

    FileCheck2 -->|No| LogError2[Log Error: Missing versions dir]
    FileCheck2 -->|Yes| FileCheck3{metadata.yaml exists?}

    FileCheck3 -->|No| LogError3[Log Error: Missing metadata.yaml]
    FileCheck3 -->|Yes| FileCheck4{archive-metadata.yaml exists?}

    FileCheck4 -->|No| LogError4[Log Error: Missing archive-metadata.yaml]
    FileCheck4 -->|Yes| ContentCheck[Content Integrity Checks]

    ContentCheck --> VersionCheck[Check Version Files]
    VersionCheck --> CountVersions[Count Version Files]
    CountVersions --> CompareCount{Versions Count Matches<br/>Archive Metadata?}

    CompareCount -->|No| LogWarning1[Log Warning: Version count mismatch]
    CompareCount -->|Yes| CheckVersionLog{VERSION-LOG.md exists?}

    CheckVersionLog -->|No| LogWarning2[Log Warning: Missing VERSION-LOG]
    CheckVersionLog -->|Yes| ValidateYAML[Validate YAML Syntax]

    ValidateYAML --> ParseStream[Parse stream.yaml]
    ParseStream --> ParseOK1{Valid YAML?}
    ParseOK1 -->|No| LogError5[Log Error: Invalid stream.yaml]
    ParseOK1 -->|Yes| ParseArchiveMeta[Parse archive-metadata.yaml]

    ParseArchiveMeta --> ParseOK2{Valid YAML?}
    ParseOK2 -->|No| LogError6[Log Error: Invalid archive-metadata.yaml]
    ParseOK2 -->|Yes| ParseMetadata[Parse metadata.yaml]

    ParseMetadata --> ParseOK3{Valid YAML?}
    ParseOK3 -->|No| LogError7[Log Error: Invalid metadata.yaml]
    ParseOK3 -->|Yes| CheckConsistency[Check Data Consistency]

    CheckConsistency --> CompareVersions{stream.yaml version ==<br/>archive-metadata final_version?}
    CompareVersions -->|No| LogWarning3[Log Warning: Version mismatch]
    CompareVersions -->|Yes| CheckGitTags[Check Git Tags]

    CheckGitTags --> GitTagCheck[git tag -l stream-name-*]
    GitTagCheck --> TagExists{Archive tag exists?}
    TagExists -->|No| LogWarning4[Log Warning: Missing git tag]
    TagExists -->|Yes| CheckIndexEntry[Check Archive Index Entry]

    CheckIndexEntry --> GrepREADME[grep stream-name archive/README.md]
    GrepREADME --> InIndex{Listed in README?}
    InIndex -->|No| LogWarning5[Log Warning: Not in index]
    InIndex -->|Yes| StreamOK[Stream Archive OK]

    LogError1 --> NextStream[Next Stream]
    LogError2 --> NextStream
    LogError3 --> NextStream
    LogError4 --> NextStream
    LogError5 --> NextStream
    LogError6 --> NextStream
    LogError7 --> NextStream
    LogWarning1 --> NextStream
    LogWarning2 --> NextStream
    LogWarning3 --> NextStream
    LogWarning4 --> NextStream
    LogWarning5 --> NextStream
    StreamOK --> NextStream

    NextStream --> IterateArchives

    GenerateReport --> CountErrors[Count Errors]
    CountErrors --> CountWarnings[Count Warnings]
    CountWarnings --> CountOK[Count OK Streams]

    CountOK --> CreateSummary[Create Summary Report]
    CreateSummary --> ListErrors{Any Errors?}
    ListErrors -->|Yes| ListErrorDetails[List Error Details]
    ListErrors -->|No| ListWarnings{Any Warnings?}

    ListErrorDetails --> ListWarnings
    ListWarnings -->|Yes| ListWarningDetails[List Warning Details]
    ListWarnings -->|No| AllOK[All Archives OK]

    ListWarningDetails --> OutputReport[Output Report]
    AllOK --> OutputReport

    OutputReport --> ActionRequired{Errors Found?}
    ActionRequired -->|Yes| NeedsFixes([Requires Fixes])
    ActionRequired -->|No| CheckComplete([Check Complete])

    style Start fill:#e1f5ff
    style CheckComplete fill:#c8e6c9
    style NeedsFixes fill:#ffcc80
    style LogError1 fill:#ffcdd2
    style LogError2 fill:#ffcdd2
    style LogError3 fill:#ffcdd2
    style LogError4 fill:#ffcdd2
    style LogError5 fill:#ffcdd2
    style LogError6 fill:#ffcdd2
    style LogError7 fill:#ffcdd2
    style LogWarning1 fill:#fff9c4
    style LogWarning2 fill:#fff9c4
    style LogWarning3 fill:#fff9c4
    style LogWarning4 fill:#fff9c4
    style LogWarning5 fill:#fff9c4
    style StreamOK fill:#c8e6c9
```

---

## 10. Statistics Generation Flow

**Description:** Process for calculating and generating archive statistics.

```mermaid
flowchart TD
    Start([Generate Statistics]) --> InitStats[Initialize Statistics]

    InitStats --> CountStreams[Count Archived Streams]
    CountStreams --> CountCmd1[ls -1d archive/*/ | wc -l]
    CountCmd1 --> StoreTotal[Store: Total Streams]

    StoreTotal --> CountByStatus[Count by Status]
    CountByStatus --> GrepCompleted[grep -c 'final_status: completed']
    GrepCompleted --> StoreCompleted[Store: Completed Count]
    StoreCompleted --> GrepPaused[grep -c 'final_status: paused']
    GrepPaused --> StorePaused[Store: Paused Count]

    StorePaused --> CountVersions[Count Total Versions]
    CountVersions --> FindVersions[find archive/ -name 'v*.yaml' | wc -l]
    FindVersions --> StoreVersions[Store: Total Versions]

    StoreVersions --> CalcDuration[Calculate Duration Statistics]
    CalcDuration --> ExtractDurations[grep 'duration_days:' all archives]
    ExtractDurations --> AwkSum[awk sum total days]
    AwkSum --> AwkAvg[awk calculate average]
    AwkAvg --> AwkMin[awk find minimum]
    AwkMin --> AwkMax[awk find maximum]
    AwkMax --> StoreDurationStats[Store Duration Stats]

    StoreDurationStats --> CalcSessions[Calculate Session Statistics]
    CalcSessions --> ExtractSessions[grep 'sessions:' all archives]
    ExtractSessions --> SumSessions[Sum total sessions]
    SumSessions --> AvgSessions[Calculate average sessions]
    AvgSessions --> StoreSessionStats[Store Session Stats]

    StoreSessionStats --> CalcHours[Calculate Development Hours]
    CalcHours --> ExtractHours[grep 'duration_hours:' all archives]
    ExtractHours --> SumHours[Sum total hours]
    SumHours --> AvgHours[Calculate average hours]
    AvgHours --> StoreHourStats[Store Hour Stats]

    StoreHourStats --> CalcGoals[Calculate Goal Statistics]
    CalcGoals --> ExtractGoalsCompleted[grep 'goals_completed:']
    ExtractGoalsCompleted --> ExtractGoalsTotal[grep 'goals_total:']
    ExtractGoalsTotal --> CalcCompletionRate[Calculate completion rate]
    CalcCompletionRate --> StoreGoalStats[Store Goal Stats]

    StoreGoalStats --> CalcVersionDist[Calculate Version Distribution]
    CalcVersionDist --> CountMajor[Count major versions: v*.0.0]
    CountMajor --> CountMinor[Count minor versions: v*.*.0]
    CountMinor --> CountPatch[Count patch versions: v*.*.*]
    CountPatch --> AvgMajor[Average major per stream]
    AvgMajor --> AvgMinor[Average minor per stream]
    AvgMinor --> AvgPatch[Average patch per stream]
    AvgPatch --> StoreVersionDist[Store Version Distribution]

    StoreVersionDist --> AnalyzeTags[Analyze Tag Distribution]
    AnalyzeTags --> ExtractTags[Extract all tags from metadata]
    ExtractTags --> CountTagOccur[Count tag occurrences]
    CountTagOccur --> SortTags[Sort by frequency]
    SortTags --> TopTags[Get top 10 tags]
    TopTags --> StoreTagDist[Store Tag Distribution]

    StoreTagDist --> CalcComplexity[Calculate Complexity Metrics]
    CalcComplexity --> GroupByGoals{Group by Goal Count}
    GroupByGoals --> Simple[Simple: under 5 goals]
    GroupByGoals --> Medium[Medium: 5-10 goals]
    GroupByGoals --> Complex[Complex: over 10 goals]

    Simple --> CountSimple[Count simple streams]
    Medium --> CountMedium[Count medium streams]
    Complex --> CountComplex[Count complex streams]

    CountSimple --> StoreComplexity[Store Complexity Distribution]
    CountMedium --> StoreComplexity
    CountComplex --> StoreComplexity

    StoreComplexity --> FormatReport[Format Statistics Report]
    FormatReport --> CreateSummary[Create Summary Section]
    CreateSummary --> CreateStatusTable[Create Status Table]
    CreateStatusTable --> CreateDurationTable[Create Duration Table]
    CreateDurationTable --> CreateVersionTable[Create Version Table]
    CreateVersionTable --> CreateTagTable[Create Tag Table]
    CreateTagTable --> CreateComplexityTable[Create Complexity Table]

    CreateComplexityTable --> OutputFormat{Output Format?}
    OutputFormat -->|Markdown| FormatMarkdown[Format as Markdown]
    OutputFormat -->|YAML| FormatYAML[Format as YAML]
    OutputFormat -->|JSON| FormatJSON[Format as JSON]
    OutputFormat -->|Table| FormatTable[Format as ASCII Table]

    FormatMarkdown --> WriteOutput[Write Statistics Output]
    FormatYAML --> WriteOutput
    FormatJSON --> WriteOutput
    FormatTable --> WriteOutput

    WriteOutput --> UpdateREADME[Update archive/README.md Statistics]
    UpdateREADME --> Timestamp[Add Generation Timestamp]
    Timestamp --> Complete([Statistics Complete])

    style Start fill:#e1f5ff
    style Complete fill:#c8e6c9
    style StoreTotal fill:#fff9c4
    style StoreCompleted fill:#fff9c4
    style StorePaused fill:#fff9c4
    style StoreVersions fill:#fff9c4
    style StoreDurationStats fill:#fff9c4
    style StoreSessionStats fill:#fff9c4
    style StoreHourStats fill:#fff9c4
    style StoreGoalStats fill:#fff9c4
    style StoreVersionDist fill:#fff9c4
    style StoreTagDist fill:#fff9c4
    style StoreComplexity fill:#fff9c4
```

---

## 11. Manual Archive Process

**Description:** Step-by-step manual archive process without using commands.

```mermaid
flowchart TD
    Start([Manual Archive]) --> Step1[Step 1: Create Archive Directory]

    Step1 --> Cmd1[mkdir -p .claude/streams/archive/stream-name]
    Cmd1 --> Step2[Step 2: Copy Stream Files]

    Step2 --> Cmd2A[cp -r .claude/streams/stream-name/*<br/>.claude/streams/archive/stream-name/]
    Cmd2A --> Verify1{All Files Copied?}
    Verify1 -->|No| ErrorCopy[Error: Copy failed]
    Verify1 -->|Yes| Step3[Step 3: Create Archive Metadata]

    Step3 --> Cmd3[nano .claude/streams/archive/<br/>stream-name/archive-metadata.yaml]
    Cmd3 --> Template[Use Archive Metadata Template]
    Template --> FillName[Fill: name]
    FillName --> FillDate[Fill: archived_date with current timestamp]
    FillDate --> FillReason[Fill: archived_reason]
    FillReason --> FillVersion[Fill: final_version from stream.yaml]
    FillVersion --> FillStatus[Fill: final_status]
    FillStatus --> FillStats[Fill: statistics section]
    FillStats --> FillSessions[Fill: sessions summary]
    FillSessions --> FillResume[Fill: resume_instructions]
    FillResume --> FillTags[Fill: tags]
    FillTags --> SaveMeta[Save archive-metadata.yaml]

    SaveMeta --> Step4[Step 4: Update Archive Index]
    Step4 --> Cmd4[nano .claude/streams/archive/README.md]
    Cmd4 --> AddSection[Add New Archive Entry Section]
    AddSection --> FillEntry[Fill Entry from Template]
    FillEntry --> UpdateStatsSection[Update Statistics Section]
    UpdateStatsSection --> IncrementCount[Increment Total Streams]
    IncrementCount --> RecalcVersions[Recalculate Total Versions]
    RecalcVersions --> RecalcHours[Recalculate Total Hours]
    RecalcHours --> UpdateDate[Update Last Updated Date]
    UpdateDate --> SaveREADME[Save README.md]

    SaveREADME --> Step5[Step 5: Remove from Active Directory]
    Step5 --> Confirm{Confirm Removal?}
    Confirm -->|No| SkipRemoval[Skip Removal, Keep in Active]
    Confirm -->|Yes| Cmd5[rm -rf .claude/streams/stream-name/]

    Cmd5 --> CheckCurrent[Check .current-stream]
    SkipRemoval --> CheckCurrent
    CheckCurrent --> IsCurrent{Was this active stream?}
    IsCurrent -->|Yes| UpdateCurrent[Update or clear .current-stream]
    IsCurrent -->|No| Step6[Step 6: Commit to Git]

    UpdateCurrent --> Step6
    Step6 --> Cmd6A[git add .claude/streams/archive/stream-name/]
    Cmd6A --> Cmd6B[git add .claude/streams/archive/README.md]
    Cmd6B --> Removed{Removed from active?}
    Removed -->|Yes| Cmd6C[git add .claude/streams/ deleted files]
    Removed -->|No| Cmd6D[Continue without active deletion]

    Cmd6C --> Cmd6E[git commit -m 'stream: Archive stream-name - reason']
    Cmd6D --> Cmd6E
    Cmd6E --> Cmd6F[git tag -a stream-stream-name-archived<br/>-m 'Stream archived']

    Cmd6F --> Verify2{Verify Git Commit?}
    Verify2 -->|Failed| ErrorGit[Error: Git commit failed]
    Verify2 -->|Success| Cmd6G[git push origin development]

    Cmd6G --> Cmd6H[git push --tags]
    Cmd6H --> Verify3[Verify Remote Push]
    Verify3 --> Complete([Manual Archive Complete])

    ErrorCopy --> Failed([Archive Failed])
    ErrorGit --> Failed

    style Start fill:#e1f5ff
    style Complete fill:#c8e6c9
    style Failed fill:#ffcdd2
    style Step1 fill:#e3f2fd
    style Step2 fill:#e3f2fd
    style Step3 fill:#fff9c4
    style Step4 fill:#fff9c4
    style Step5 fill:#ffe0b2
    style Step6 fill:#ffe0b2
```

---

## 12. Archive File Lifecycle

**Description:** State machine showing the lifecycle of stream files from active to archived.

```mermaid
stateDiagram-v2
    [*] --> Active: Stream Created

    Active --> Working: Development in Progress
    Working --> Checkpoint: Create Checkpoint
    Checkpoint --> Working: Continue Development

    Working --> Paused: Pause Stream
    Paused --> Working: Resume Stream
    Paused --> LongPause: 30+ Days Inactive

    Working --> Completed: All Goals Achieved
    Completed --> ReadyToArchive: stream-end called

    LongPause --> ReadyToArchive: Manual Archive Decision

    ReadyToArchive --> ArchiveCreated: Create Archive Directory
    ArchiveCreated --> FilesCopied: Copy Files to Archive
    FilesCopied --> MetadataGenerated: Generate archive-metadata.yaml
    MetadataGenerated --> IndexUpdated: Update Archive Index
    IndexUpdated --> GitCommitted: Git Commit and Tag
    GitCommitted --> Archived: Archive Complete

    Archived --> RemovedFromActive: Optional: Delete from Active
    RemovedFromActive --> ArchivedFinal: Archive Final State
    Archived --> KeptInActive: Optional: Keep in Active
    KeptInActive --> ArchivedFinal

    ArchivedFinal --> UnarchiveRequested: Unarchive Request
    UnarchiveRequested --> CopiedToActive: Copy to Active Directory
    CopiedToActive --> ArchiveMetaRemoved: Remove archive-metadata.yaml
    ArchiveMetaRemoved --> StatusUpdated: Update Status
    StatusUpdated --> IndexReverted: Update Archive Index
    IndexReverted --> Active: Unarchive Complete

    ArchivedFinal --> GitRestored: Git Restore Request
    GitRestored --> CheckoutFromHistory: git checkout from history
    CheckoutFromHistory --> UnarchiveRequested

    ArchivedFinal --> [*]: Permanent Archive

    note right of Active
        Files in:
        .claude/streams/stream-name/
        - stream.yaml
        - versions/
        - metadata.yaml
    end note

    note right of ArchivedFinal
        Files in:
        .claude/streams/archive/stream-name/
        - stream.yaml (final)
        - versions/ (complete)
        - metadata.yaml
        - archive-metadata.yaml
    end note

    note right of Working
        Operations:
        - stream-update
        - stream-checkpoint
        - Add goals
        - Track progress
    end note

    note right of Archived
        Operations:
        - Search archives
        - View statistics
        - Compare versions
        - Extract lessons
    end note
```

---

## Diagram Usage Guide

### When to Use Each Diagram

**1. Archive Process Flow**
- Planning archive implementation
- Understanding end-to-end archive workflow
- Training new developers
- Debugging archive issues

**2. Archive Directory Structure**
- Setting up archive directory
- Understanding file organization
- Planning storage strategy
- Documentation reference

**3. Archive Decision Tree**
- Deciding when to archive
- Understanding automatic vs manual archiving
- Handling edge cases
- Policy documentation

**4. Unarchive and Recovery Process**
- Restoring archived streams
- Recovery planning
- Handling conflicts
- Disaster recovery procedures

**5. Archive Maintenance Schedule**
- Planning maintenance tasks
- Resource allocation
- Team responsibilities
- Quality assurance

**6. Search and Discovery Flow**
- Implementing search features
- Query optimization
- User interface design
- Performance tuning

**7. Archive Index Management**
- Maintaining archive index
- Index organization
- Update procedures
- Consistency checks

**8. Archive Metadata Relationships**
- Understanding data model
- Database design
- Query planning
- Data validation

**9. Archive Integrity Check Process**
- Quality assurance
- Audit procedures
- Error detection
- Validation workflows

**10. Statistics Generation Flow**
- Reporting implementation
- Metrics calculation
- Dashboard design
- Performance monitoring

**11. Manual Archive Process**
- Emergency procedures
- Command failure fallback
- Training documentation
- Troubleshooting guide

**12. Archive File Lifecycle**
- Understanding state transitions
- Process documentation
- System design
- Lifecycle management

---

## Implementation Notes

### Mermaid Diagram Types Used

**Flowchart (flowchart TD):**
- Archive Process Flow
- Archive Decision Tree
- Unarchive and Recovery Process
- Search and Discovery Flow
- Archive Index Management
- Archive Integrity Check Process
- Statistics Generation Flow
- Manual Archive Process

**Graph (graph TD):**
- Archive Directory Structure

**Gantt Chart (gantt):**
- Archive Maintenance Schedule

**Entity Relationship Diagram (erDiagram):**
- Archive Metadata Relationships

**State Diagram (stateDiagram-v2):**
- Archive File Lifecycle

### Color Coding Legend

**Node Colors:**
- Light Blue (e1f5ff): Start/Entry points
- Green (c8e6c9): Completion/Success states
- Red (ffcdd2): Error/Failure states
- Yellow (fff9c4): Important operations/decisions
- Orange (ffe0b2): Git operations
- Light Green (b2dfdb): Display/Output operations
- Gray (f5f5f5): No action/Skip operations
- Teal (b2dfdb): Automatic operations
- Light Orange (ffccbc): Manual operations

### Rendering Diagrams

These Mermaid diagrams render natively in:
- GitHub (markdown files)
- GitLab (markdown files)
- VS Code (with Mermaid extension)
- Documentation sites (MkDocs, Docusaurus, etc.)
- Browser (with Mermaid.js library)

**Online Rendering:**
- https://mermaid.live - Live editor and preview
- https://mermaid-js.github.io - Official documentation

---

## Related Documentation

**Comprehensive Guides:**
- [Stream Archive Management Guide](./stream-archive-management.md) - Practical operations
- [Stream Versioning and Archiving System](./stream-versioning-and-archiving.md) - Complete specification
- [Work Streams Documentation Hub](./README.md) - All documentation index

**Other Diagram Sets:**
- [Stream Archaeology Agent Diagrams](./v1.3.0-stream-archaeology-diagrams.md) - 12 diagrams for intelligent analysis
- [Autonomous Context Engineering Diagrams](./v1.3.0-autonomous-context-engineering-diagrams.md) - 15 diagrams for context management

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-03
**Author:** Work Streams Team
**Status:** Complete

**Total Diagrams:** 12 comprehensive Mermaid diagrams covering all archive management workflows and processes.