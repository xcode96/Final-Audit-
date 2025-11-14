
import type { SectionData, Question, QuestionPriority, Framework } from './types';
import {
  ShieldIcon,
  UsersIcon,
  LockIcon,
  CodeIcon,
  OperationIcon,
  FolderIcon,
  PeopleIcon,
  PhysicalSecurityIcon,
  TechnologicalIcon,
} from './components/icons';

const questionContentMap: { [key: string]: { description: string; evidenceGuidance: string } } = {
  "Have the internal and external issues that are relevant to the organization's ISMS determined": {
    description: "Meaning:\nThis requires identifying factors like business strategy, culture, legal landscape, and market trends that could impact the ISMS's success. It's about understanding the 'big picture' context in which the information security system operates.",
    evidenceGuidance: "What to Show / Evidence:\n- PESTLE/SWOT analysis documents.\n- Meeting minutes from strategic planning or management reviews.\n- A formal register of internal and external issues."
  },
  "Have impact and the risk associated to the issues determined": {
    description: "Meaning:\nOnce issues are identified, their potential positive or negative impact on information security must be evaluated. This step connects the high-level context to tangible risks and opportunities for the ISMS.",
    evidenceGuidance: "What to Show / Evidence:\n- Risk assessment reports that explicitly link risks to the identified issues.\n- Business Impact Analysis (BIA) that considers these contextual issues.\n- A documented process for how impacts are evaluated."
  },
  "Have the remediation plan for issues documented": {
    description: "Meaning:\nThe organization must plan how it will address the risks and opportunities arising from its context. This means creating a formal plan to manage or mitigate negative impacts and leverage positive ones.",
    evidenceGuidance: "What to Show / Evidence:\n- Risk treatment plans.\n- Project plans or action item trackers for addressing specific issues.\n- Documented procedures for how remediation is planned and tracked."
  },
  "Has the organization determined the interested parties that are relevant to the ISMS": {
    description: "Meaning:\nThis requires identifying all internal and external stakeholders whose needs can affect the ISMS. This includes customers, employees, suppliers, regulators, and shareholders.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented list or register of interested parties (stakeholders).\n- Stakeholder analysis documents (e.g., a stakeholder map).\n- Management review meeting minutes where interested parties were identified."
  },
  "Has the organization determined the needs and expectations of these interested parties": {
    description: "Meaning:\nFor each identified stakeholder, the organization must understand their specific requirements and expectations regarding information security. For example, customers expect data privacy, while regulators require legal compliance.",
    evidenceGuidance: "What to Show / Evidence:\n- A matrix linking interested parties to their specific information security requirements.\n- Records of surveys, interviews, or meetings with stakeholders.\n- Analysis of contractual and legal obligations."
  },
  "Have the requirements of these interested parties been determined, including legal, regulatory and contractual requirements?": {
    description: "Meaning:\nThis is about formalizing the identified needs into a clear set of requirements that the ISMS must meet. This explicitly includes legal, regulatory, and contractual obligations that the organization must adhere to.",
    evidenceGuidance: "What to Show / Evidence:\n- A register of legal, regulatory, and contractual requirements.\n- The information security policy, which should reference these requirements.\n- Contracts with clauses related to information security."
  },
  "Have the boundaries and applicability of the ISMS been determined to establish its scope, taking into consideration the external and internal issues, the requirements of interested parties and the interfaces and dependencies with other organizations?": {
    description: "Meaning:\nThe scope defines 'what's in and what's out' of the ISMS. It must be clearly defined, considering the organization's context, stakeholder requirements, and any dependencies on other systems or third parties.",
    evidenceGuidance: "What to Show / Evidence:\n- The official ISMS Scope Statement document.\n- Network diagrams or architectural documents that delineate the ISMS boundaries.\n- Meeting minutes where the scope was discussed and approved."
  },
  "Has the organization defined the scope of ISMS including the in scope departments, interfaces, dependences and the locations": {
    description: "Meaning:\nThe scope document must be specific. It should list all departments, physical locations, key systems, and dependencies (e.g., cloud services) that are covered by the ISMS.",
    evidenceGuidance: "What to Show / Evidence:\n- The detailed ISMS Scope Statement document.\n- An appendix listing all in-scope assets, locations, and departments."
  },
  "Is ISMS scope been documented": {
    description: "Meaning:\nThe final scope must be formally documented and maintained as part of the ISMS. It serves as the foundational document for all audit and certification activities.",
    evidenceGuidance: "What to Show / Evidence:\n- The official, version-controlled ISMS Scope Statement document, available to relevant parties."
  },
    "Is there a formal policy covering the information security requirements for allowing personnel to work and access organization's information remotely.": {
    description: "Meaning:\nThis checks for the existence of a foundational document that governs remote work. There must be a written, structured policy that outlines all security expectations and rules for employees working outside the office, not just an informal practice.",
    evidenceGuidance: "What to Show / Evidence:\n- The official Remote Work or Teleworking Policy document.\n- Ensure the document is version-controlled and shows a recent review/approval date."
  },
  "Is the remote working policy approved by the top management.": {
    description: "Meaning:\nThis verifies that the remote work policy has been formally endorsed by senior leadership. Management approval signifies that the policy is an official organizational directive, has the necessary authority, and aligns with the organization's strategic goals and risk appetite.",
    evidenceGuidance: "What to Show / Evidence:\n- An approval section in the policy document with signatures (physical or digital) from top management (e.g., CEO, CIO, CISO).\n- Meeting minutes from a management or board meeting where the policy was discussed and approved."
  },
  "Is the remote working policy communicated to all full-time, part-time and temporary staff who work remotely.": {
    description: "Meaning:\nA policy is ineffective if people don't know about it. This control checks if the organization has actively distributed the policy to all relevant personnel and can prove they have received and understood it.",
    evidenceGuidance: "What to Show / Evidence:\n- Records of company-wide emails or intranet posts announcing the policy.\n- Signed acknowledgement forms (physical or digital).\n- Records from a training system showing employees have completed a module on the remote work policy."
  },
  "Does the remote working policy consider physical security requirements.": {
    description: "Meaning:\nThis assesses whether the policy extends beyond digital security to the physical environment. It should provide clear guidance on securing the remote workspace, such as requirements for lockable storage for documents and devices, rules for clear desk/screen, secure printing and disposal of sensitive materials, and protecting assets during transport.",
    evidenceGuidance: "What to Show / Evidence:\n- Specific clauses within the remote work policy that detail physical security requirements for the home or remote office.\n- Employee self-assessment checklists for home office security.\n- Security awareness training materials that cover these topics."
  },
  "Does the remote working policy consider the communications security requirements.": {
    description: "Meaning:\nThis checks if the policy specifies how to protect data in transit when working remotely. It should mandate the use of secure communication channels to prevent eavesdropping or interception of company information over untrusted networks (like home Wi-Fi or public hotspots).",
    evidenceGuidance: "What to Show / Evidence:\n- Policy clauses requiring the use of a corporate VPN for all access to internal resources.\n- Specified Wi-Fi security standards (e.g., WPA2/WPA3) for home networks.\n- A clear prohibition on using public, unsecured Wi-Fi for sensitive work."
  },
  "Does the remote working policy consider the threat of unauthorized access to information or resources from other persons in public places.": {
    description: "Meaning:\nThis addresses the risk of \"shoulder surfing\" or unauthorized viewing of information by others when working in public spaces like cafes or airports. The policy must require employees to be situationally aware and take active measures to protect their screens and conversations.",
    evidenceGuidance: "What to Show / Evidence:\n- Policy rules mandating the use of screen privacy filters on laptops when in public.\n- Guidelines on positioning screens away from public view.\n- Reminders in security awareness training about the risks of working in shared spaces."
  },
  "Does the remote working policy consider use of security measures, such as firewalls and protection against malware.": {
    description: "Meaning:\nThis verifies that the policy mandates essential technical safeguards on remote devices. It ensures that any device connecting to the corporate network has baseline protections like firewalls and anti-malware software enabled and kept up-to-date.",
    evidenceGuidance: "What to Show / Evidence:\n- Policy statements requiring active firewalls and updated anti-malware software on all remote devices.\n- Screenshots from endpoint management software (e.g., MDM, EDR) reports showing the compliance status of remote devices.\n- BYOD (Bring Your Own Device) policy section with these technical requirements."
  },
  "Are all full-time, part-time, and temporary staff made aware of their responsibility to report information security events.": {
    description: `Meaning:\nThe assessor is verifying that every individual understands their obligation to report any security event they notice. This is a fundamental part of creating a security-conscious culture. It's not enough to have a process; people must know they are required to use it.`,
    evidenceGuidance: `What to Show / Evidence:\n- Employee handbook or code of conduct stating this responsibility.\n- Signed acknowledgements of the information security policy.\n- Security awareness training materials that cover reporting duties.`
  },
  "Are all full-time, part-time, and temporary staff made aware of the procedure for reporting information security.": {
    description: `Meaning:\nBeyond knowing they *should* report events, do personnel know *how* to do it? This question checks if the specific steps for reporting (e.g., who to contact, what information to provide) have been clearly communicated to everyone.`,
    evidenceGuidance: `What to Show / Evidence:\n- A documented incident reporting procedure.\n- Intranet pages, posters, or wallet cards with reporting instructions.\n- Screenshots of the reporting tool or ticketing system.\n- Onboarding materials for new hires.`
  },
  "Are all full-time, part-time, and temporary staff made aware of the communication contact details and communication medium for reporting security events?": {
    description: `Meaning:
The assessor is ensuring that personnel know exactly where and how to report incidents, such as:

Communication channels may include:
- Dedicated incident reporting email (e.g., security@company.com)
- Hotline or emergency phone number
- Ticketing system (e.g., ServiceNow, Jira)
- Security operations portal or form
- Reporting via line manager (if part of the process)

Employees must know:
- Who receives these reports
- Which channels are primary vs. secondary
- When to use each method (e.g., urgent phone call vs. normal ticket)

This ensures quick, consistent, and reliable reporting.`,
    evidenceGuidance: `What to Show / Evidence:
- Policy or guidelines listing reporting contacts
- Posters, emails, or intranet pages with reporting details
- Onboarding materials showing communication channels
- Awareness campaigns or reminders
- Incident response plan with contact directory`
  },
  "Are background verification checks carried out for all candidates for employment, contractors and third-party users?": {
    description: "Meaning:\nThis control verifies that the organization has a formal process to vet individuals before granting them access to sensitive information. The check should be proportional to the business risks, the classification of the information to be accessed, and applicable laws.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented HR security or screening policy.\n- Evidence of checks being performed (e.g., redacted reports from a third-party verification service).\n- Employment contracts that reference the requirement for screening."
  },
  "Are information security requirements addressed in the terms and conditions of employment?": {
    description: "Meaning:\nThis ensures that information security responsibilities are a formal part of every employee's contractual obligations from the moment they are hired.",
    evidenceGuidance: "What to Show / Evidence:\n- Standard employment contract templates with information security clauses.\n- Employee handbook or code of conduct that is referenced in the employment contract."
  },
  "Do all employees of the organization and, where relevant, contractors receive appropriate awareness education and training and regular updates in organizational policies and procedures, as relevant for their job function?": {
    description: "Meaning:\nThis control verifies that the organization has an ongoing program to educate its workforce about information security threats, policies, and their personal responsibilities.",
    evidenceGuidance: "What to Show / Evidence:\n- A formal security awareness and training plan.\n- Training materials (e.g., slide decks, e-learning modules).\n- Completion records for new hire and annual refresher training.\n- Records of phishing simulation campaigns and results."
  },
  "Is there a formal disciplinary process for employees who have committed an information security breach?": {
    description: "Meaning:\nThis ensures that there are clear and consistent consequences for violating information security policies. The process should be communicated to all employees and applied fairly.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented disciplinary policy that includes information security violations.\n- HR procedures for handling security incidents.\n- Redacted records of past disciplinary actions (if applicable and permitted)."
  },
  "Are information security responsibilities and duties that remain valid after termination or change of employment defined, enforced and communicated to relevant personnel and other interested parties?": {
    description: "Meaning:\nThis control ensures that obligations like confidentiality continue even after an employee leaves the organization. This is crucial for protecting long-term sensitive information.",
    evidenceGuidance: "What to Show / Evidence:\n- Clauses in employment contracts or exit paperwork detailing post-employment responsibilities.\n- Signed non-disclosure agreements (NDAs) that survive termination of employment."
  },
  "Have confidentiality or non-disclosure agreements that reflect the organization’s needs for the protection of information been identified, documented, reviewed and signed by personnel and other relevant interested parties?": {
    description: "Meaning:\nThis verifies that the organization uses legally binding agreements to protect its confidential information when shared with employees, contractors, or other third parties.",
    evidenceGuidance: "What to Show / Evidence:\n- Standard templates for confidentiality and non-disclosure agreements.\n- A register or log of signed NDAs.\n- Policy defining when an NDA is required."
  },
  "Are security perimeters defined and used to protect areas that contain sensitive or critical information and information processing facilities?": {
    description: "Meaning:\nThis control verifies that the organization has established clearly defined physical boundaries (e.g., walls, fences, controlled entry points) to protect buildings and offices that house critical IT infrastructure and sensitive data.",
    evidenceGuidance: "What to Show / Evidence:\n- Site plans or building layouts showing defined security perimeters.\n- Physical security policy defining different security zones.\n- Photos of physical barriers like fences, walls, and locked doors."
  },
  "Are secure areas protected by appropriate entry controls to ensure that only authorized personnel are allowed access?": {
    description: "Meaning:\nThis checks for mechanisms that enforce the security perimeter, such as key cards, biometric scanners, or a formal reception desk, to control who can enter secure areas.",
    evidenceGuidance: "What to Show / Evidence:\n- Access control system logs.\n- A documented procedure for granting and revoking physical access.\n- Visitor logs from reception areas.\n- Photos of access control devices (e.g., card readers)."
  },
    "Are security measures in place to secure offices, rooms, and facilities against unauthorized access?": {
    description: "Meaning:\nThis verifies that physical security measures are implemented to prevent unauthorized entry into the organization's premises. It covers areas beyond just the main entrance, including individual offices or storage rooms containing sensitive information.",
    evidenceGuidance: "What to Show / Evidence:\n- Physical security policy.\n- Access logs for specific rooms.\n- Photos of locks on doors and cabinets.\n- Procedures for key management."
  },
  "Are premises continuously monitored for unauthorized physical access using methods like CCTV or intruder alarms?": {
    description: "Meaning:\nThis control checks if the organization uses monitoring systems like CCTV or intruder alarms to detect and deter unauthorized physical access, and if there are procedures to respond to alerts from these systems.",
    evidenceGuidance: "What to Show / Evidence:\n- CCTV camera placement diagrams.\n- Alarm system specifications and test records.\n- Procedures for responding to security alerts.\n- Redacted footage or logs from an incident."
  },
  "Is physical protection against damage from fire, flood, earthquake, explosion, civil unrest and other forms of natural or man-made disaster implemented?": {
    description: "Meaning:\nThis control assesses the organization's resilience to environmental and physical threats. It's about having measures in place to protect facilities and equipment from disasters.",
    evidenceGuidance: "What to Show / Evidence:\n- Fire detection and suppression systems (e.g., smoke detectors, sprinklers) and their maintenance records.\n- Environmental monitoring systems (e.g., for temperature and humidity) and their logs.\n- Business continuity and disaster recovery plans that address physical threats."
  },
  "Are procedures for working in secure areas designed and implemented?": {
    description: "Meaning:\nThis verifies that there are specific rules for behavior within secure areas (like data centers) to reduce risks, such as prohibiting personal electronic devices or requiring supervision for visitors.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented policy for working in secure areas.\n- Signage at the entrance to secure areas outlining the rules.\n- Training materials for personnel who work in these areas."
  },
  "Are policies for a clear desk for papers and removable storage media and a clear screen for information processing facilities adopted?": {
    description: "Meaning:\nThis control aims to reduce the risk of unauthorized access or theft of information from unattended workspaces. It requires employees to lock their computers and store sensitive documents when they step away from their desks.",
    evidenceGuidance: "What to Show / Evidence:\n- A formal Clear Desk and Clear Screen Policy.\n- Security awareness materials reminding employees of this policy.\n- Evidence of technical controls, such as automatic screen locking via Group Policy."
  },
   "Is equipment sited and protected to reduce risks from environmental threats and unauthorized access?": {
    description: "Meaning:\nThis assesses whether critical equipment is placed in locations that minimize exposure to risks like flood, fire, or theft. It also considers protection from power failures or other utility disruptions.",
    evidenceGuidance: "What to Show / Evidence:\n- Data center layout diagrams.\n- Risk assessments for physical location.\n- Photos of equipment racks with proper clearance and security.\n- Procedures for handling equipment."
  },
  "Are assets, such as laptops and mobile devices, protected when they are taken outside the organization's premises?": {
    description: "Meaning:\nThis control ensures that security measures apply to company assets (like laptops and mobile devices) even when they are used off-site, for example, at an employee's home, during travel, or at a client site.",
    evidenceGuidance: "What to Show / Evidence:\n- Remote work policy.\n- Policy for taking equipment off-site.\n- Technical controls like full-disk encryption and remote wipe capabilities.\n- User awareness training materials on securing devices in public."
  },
  "Is all storage media managed and controlled securely throughout its lifecycle?": {
    description: "Meaning:\nThis verifies that there are formal procedures for handling removable and non-removable media to prevent unauthorized access, misuse, or data loss. This includes logging, transportation, and secure destruction.",
    evidenceGuidance: "What to Show / Evidence:\n- Media handling policy.\n- Logs for media movement.\n- Procedures for sanitizing or destroying media.\n- Certificates of destruction."
  },
  "Is equipment protected from power failures and other disruptions caused by failures in supporting utilities like electricity, water, or internet connectivity?": {
    description: "Meaning:\nThis checks for resilience against utility outages. It assesses if critical systems are supported by uninterruptible power supplies (UPS), backup generators, and redundant network connections to ensure continuous availability.",
    evidenceGuidance: "What to Show / Evidence:\n- UPS and generator specifications and maintenance/test records.\n- Service level agreements (SLAs) with utility providers.\n- Data center diagrams showing power redundancy."
  },
  "Are power and telecommunications cabling protected from interception, interference, or damage?": {
    description: "Meaning:\nThis control focuses on protecting the physical network and power infrastructure. It ensures that cables are properly installed in protected conduits or pathways to prevent physical tapping, accidental damage, or electromagnetic interference.",
    evidenceGuidance: "What to Show / Evidence:\n- Network diagrams showing cable runs.\n- Photos of secured network closets and cable trays.\n- Policy on network cabling standards."
  },
  "Is equipment correctly maintained to ensure its continued availability and integrity, with security considered during maintenance?": {
    description: "Meaning:\nThis verifies that there is a formal process for equipment maintenance, including preventative servicing and repairs. It also ensures that security is maintained during maintenance activities, especially when performed by third parties.",
    evidenceGuidance: "What to Show / Evidence:\n- Equipment maintenance policy and schedule.\n- Maintenance logs and records.\n- Contracts with third-party maintenance providers that include security clauses."
  },
  "Is there a formal process for the secure disposal or re-use of equipment?": {
    description: "Meaning:\nThis verifies that when IT equipment is decommissioned, any sensitive data stored on it is securely and permanently erased before it is disposed of, sold, or repurposed.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented media sanitization or equipment disposal policy.\n- Records of data destruction (e.g., certificates of destruction from a third-party vendor).\n- Logs from data wiping software."
  },
  "Are user endpoint devices protected?": {
    description: "Meaning:\nThis control ensures that workstations, laptops, and mobile devices used by employees are secured against threats. This includes measures like anti-malware, firewalls, and encryption.",
    evidenceGuidance: "What to Show / Evidence:\n- Endpoint security policy or standard configuration documents.\n- Reports from endpoint management software (e.g., Intune, Jamf, CrowdStrike) showing compliance status.\n- Screenshots of a typical device's security settings (e.g., full-disk encryption enabled)."
  },
  "Is the allocation and use of privileged access rights restricted and managed?": {
    description: "Meaning:\nThis verifies that powerful administrative accounts are tightly controlled, limited to only those who absolutely need them, and monitored. This is critical for preventing widespread damage from a compromised account.",
    evidenceGuidance: "What to Show / Evidence:\n- A Privileged Access Management (PAM) policy.\n- A list of personnel with administrative rights and the justification for their access.\n- Logs from a PAM solution or access request system showing approvals for privileged access."
  },
  "Is access to information and systems restricted based on the principle of least privilege ('need-to-know')?": {
    description: "Meaning:\nThis control verifies that users are only granted the minimum level of access necessary to perform their job functions. It's a fundamental security principle to reduce the risk of unauthorized data access and limit potential damage from a compromised account.",
    evidenceGuidance: "What to Show / Evidence:\n- Access control policy stating the principle of least privilege.\n- Role-based access control (RBAC) matrix.\n- System configurations showing user permissions."
  },
  "Are access restrictions implemented through technical controls?": {
    description: "Meaning:\nThis checks that access policies are not just on paper but are enforced by the systems themselves. It ensures technical mechanisms (like ACLs, file permissions, and application roles) are used to prevent users from accessing data they are not authorized to see.",
    evidenceGuidance: "What to Show / Evidence:\n- Screenshots of access control lists (ACLs) on file servers or databases.\n- Configuration of roles in a cloud IAM system (e.g., AWS, Azure).\n- Application permission settings."
  },
  "Is access to source code restricted to authorized developers only?": {
    description: "Meaning:\nThis control protects the organization's intellectual property and the integrity of its software by ensuring that only authorized individuals can view or modify source code.",
    evidenceGuidance: "What to Show / Evidence:\n- Access control logs from the source code repository (e.g., GitHub, GitLab).\n- A list of users with access to specific repositories.\n- Branch protection rules in the version control system."
  },
  "Are changes to source code managed through a version control system with access controls?": {
    description: "Meaning:\nThis verifies the use of a system like Git to track all changes to source code. This provides an audit trail and, when combined with access controls (like requiring pull requests and reviews), prevents unauthorized or un-tested code from being merged.",
    evidenceGuidance: "What to Show / Evidence:\n- The organization's version control branching strategy.\n- Screenshots of pull requests with required reviewer approvals.\n- Audit logs from the version control system."
  },
  "Is secure authentication used to control access to information and systems?": {
    description: "Meaning:\nThis control checks that the organization enforces strong methods for verifying user identity, such as complex passwords and multi-factor authentication (MFA), to prevent unauthorized access.",
    evidenceGuidance: "What to Show / Evidence:\n- A password policy document.\n- An identity and access management (IAM) policy requiring MFA.\n- Screenshots of system configuration showing MFA is enforced for critical applications (e.g., O365, VPN)."
  },
  "Is system capacity (e.g., CPU, memory, storage) monitored to ensure performance and availability?": {
    description: "Meaning:\nThis ensures the organization actively monitors the performance of its systems to prevent outages or slowdowns caused by resource exhaustion. It's about proactively managing system health.",
    evidenceGuidance: "What to Show / Evidence:\n- Dashboards from a monitoring tool (e.g., Datadog, Zabbix) showing resource utilization trends.\n- Alerting configurations for capacity thresholds.\n- Capacity management reports."
  },
  "Is there a process for capacity planning to project future needs?": {
    description: "Meaning:\nThis verifies that the organization looks ahead to anticipate future resource needs based on business growth and projects. This prevents performance issues by ensuring capacity is added before it becomes a problem.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented capacity management process.\n- Capacity planning meeting minutes.\n- Reports showing analysis of historical trends and future projections."
  },
  "Is protection against malware implemented and supported by appropriate user awareness?": {
    description: "Meaning:\nThis ensures the organization has deployed anti-malware software across its devices and networks and keeps it updated to protect against viruses, ransomware, and other malicious software.",
    evidenceGuidance: "What to Show / Evidence:\n- An anti-malware policy.\n- Reports from a centralized antivirus management console showing all devices are protected and up-to-date.\n- Security awareness training materials that cover how to identify and avoid malware."
  },
  "Are technical vulnerabilities managed in a timely manner?": {
    description: "Meaning:\nThis control verifies that the organization has a process to identify, assess, and patch security flaws in its software and systems before they can be exploited by attackers.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented vulnerability management program.\n- Reports from vulnerability scanning tools (e.g., Nessus, Qualys).\n- Patch management records or reports from systems like WSUS or SCCM showing patching status."
  },
  "Are secure configuration baselines defined and implemented for all systems?": {
    description: "Meaning:\nThis verifies that the organization has a standardized, secure 'template' for configuring new systems (servers, workstations, network devices). This ensures consistency and that all systems are hardened against common threats from the start.",
    evidenceGuidance: "What to Show / Evidence:\n- Documented security configuration standards (e.g., CIS Benchmarks).\n- 'Golden image' or infrastructure-as-code templates.\n- Reports from configuration management tools (e.g., Ansible, Puppet)."
  },
  "Is there a process to manage and review changes to system configurations?": {
    description: "Meaning:\nThis control ensures that any deviation from the secure baseline is formally managed through a change control process. This prevents unauthorized changes and reduces the risk of misconfigurations.",
    evidenceGuidance: "What to Show / Evidence:\n- Change management policy and procedures.\n- Change requests records with approvals.\n- Audit logs showing configuration changes."
  },
  "Are tools used to monitor for configuration drift?": {
    description: "Meaning:\nThis checks if the organization uses automated tools to detect when a system's configuration no longer matches the approved baseline. This allows for quick identification and remediation of unauthorized or accidental changes.",
    evidenceGuidance: "What to Show / Evidence:\n- Reports from a configuration monitoring or compliance scanning tool.\n- Alerts generated for configuration drift.\n- Procedures for investigating and correcting drift."
  },
  "Is information deleted when no longer needed?": {
    description: "Meaning:\nThis ensures that data is not kept longer than necessary, reducing the 'attack surface' and minimizing the impact of a potential data breach. It also relates to privacy compliance (e.g., GDPR's 'right to be forgotten').",
    evidenceGuidance: "What to Show / Evidence:\n- A data retention policy and schedule.\n- Documented procedures for secure data deletion.\n- System configurations showing automated deletion jobs.\n- Records of data disposal requests being fulfilled."
  },
  "Is data masking or anonymization used to protect sensitive data in non-production environments (e.g., testing, development)?": {
    description: "Meaning:\nThis control verifies that real, sensitive data is not unnecessarily exposed in less secure environments. It involves replacing sensitive data with realistic but fake data to protect it while still allowing for effective development and testing.",
    evidenceGuidance: "What to Show / Evidence:\n- Data masking policy or procedure.\n- Screenshots of data masking tool configurations.\n- Database schemas for test environments showing masked data fields."
  },
  "Is there a policy that defines when and how data masking should be applied?": {
    description: "Meaning:\nThis checks for a formal, documented approach to data masking. The policy should specify which data elements must be masked, the approved methods for masking, and the process for using masked data.",
    evidenceGuidance: "What to Show / Evidence:\n- A formal Data Masking Policy document.\n- Data classification policy that specifies masking requirements for sensitive data."
  },
  "Are information backup copies regularly taken and tested?": {
    description: "Meaning:\nThis control verifies that the organization has a reliable process for backing up critical data and, just as importantly, periodically testing those backups to ensure they can be successfully restored in an emergency.",
    evidenceGuidance: "What to Show / Evidence:\n- A backup policy document.\n- Backup job success/failure reports from the backup software.\n- A log of backup restore tests, including who performed the test, when, what was restored, and the outcome."
  },
  "Are logs that record activities, exceptions, faults and information security events generated, stored, protected and analyzed?": {
    description: "Meaning:\nThis ensures that the organization collects event logs from critical systems, protects them from tampering, and regularly reviews them to detect, investigate, and respond to security incidents.",
    evidenceGuidance: "What to Show / Evidence:\n- A logging and monitoring policy.\n- System configurations showing logging is enabled correctly.\n- Screenshots from a SIEM (Security Information and Event Management) tool showing log collection and analysis.\n- Examples of incident investigations that used log data."
  },
  "Are the clocks of information processing systems synchronized?": {
    description: "Meaning:\nThis control ensures that all systems in the network have a consistent and accurate time. This is critical for correlating log events from different systems during a security investigation to understand the sequence of events.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented time synchronization policy.\n- Network diagrams or documentation showing the NTP (Network Time Protocol) architecture.\n- Screenshots of system configurations pointing to a central time source."
  },
  "Is the installation of software on production systems restricted and controlled?": {
    description: "Meaning:\nThis control verifies that there is a formal process to prevent unauthorized software from being installed on operational systems, which could introduce vulnerabilities or instability.",
    evidenceGuidance: "What to Show / Evidence:\n- A policy on software installation.\n- Change management records for software installation.\n- Technical controls (like AppLocker or other application whitelisting) that restrict software installation."
  },
  "Is there a formal change management process for installing new software or updates?": {
    description: "Meaning:\nThis checks that all software installations and updates go through a documented review and approval process to assess their impact and security implications before deployment.",
    evidenceGuidance: "What to Show / Evidence:\n- Change management process documentation.\n- Examples of approved change requests for software installations."
  },
  "Are network security controls like firewalls and intrusion detection/prevention systems implemented?": {
    description: "Meaning:\nThis verifies that the organization has deployed fundamental network security technologies to control traffic flow and detect/block malicious activity at the network level.",
    evidenceGuidance: "What to Show / Evidence:\n- Network diagrams showing firewall and IDS/IPS placement.\n- Firewall rule sets.\n- Configuration files or screenshots from network security appliances."
  },
  "Are network devices (routers, switches) securely configured and managed?": {
    description: "Meaning:\nThis control ensures that the network infrastructure itself is hardened against attack. This includes changing default passwords, disabling unused services, and keeping firmware up-to-date.",
    evidenceGuidance: "What to Show / Evidence:\n- Secure configuration standards for network devices.\n- Configuration files from routers and switches.\n- Records of firmware updates."
  },
  "Are security requirements defined and enforced for all network services (e.g., DNS, DHCP)?": {
    description: "Meaning:\nThis verifies that essential network services are configured securely to prevent them from being exploited. For example, ensuring DNS servers are not configured as open resolvers.",
    evidenceGuidance: "What to Show / Evidence:\n- A policy or standard for secure configuration of network services.\n- Configuration files for services like DNS, DHCP, NTP.\n- Results from security scans of network services."
  },
  "Are unnecessary network ports and services disabled?": {
    description: "Meaning:\nThis is a core security principle to reduce the attack surface. The control checks that only the ports and services that are essential for a system's function are enabled, and all others are turned off.",
    evidenceGuidance: "What to Show / Evidence:\n- Secure configuration standards that specify disabling unused services.\n- Results from port scans showing only expected ports are open."
  },
  "Is network segmentation used to separate sensitive environments (e.g., production vs. development, PCI zone)?": {
    description: "Meaning:\nThis control involves dividing the network into smaller, isolated segments (or zones) to limit the spread of an attack. If one segment is compromised, segmentation can prevent the attacker from easily moving to other parts of the network.",
    evidenceGuidance: "What to Show / Evidence:\n- Network architecture diagrams showing different security zones (VLANs, subnets).\n- Firewall rule sets that enforce separation between zones."
  },
  "Are firewall rules in place to control traffic between network segments?": {
    description: "Meaning:\nThis checks that the boundaries between network segments are enforced by firewalls that are configured to only allow necessary and approved traffic to pass between them.",
    evidenceGuidance: "What to Show / Evidence:\n- Firewall rule review documentation.\n- A documented process for requesting and approving firewall rule changes."
  },
  "Is web filtering implemented to block access to known malicious or inappropriate websites?": {
    description: "Meaning:\nThis control aims to protect users and the organization by preventing access to websites that could host malware, phishing attacks, or other undesirable content. It's a proactive defense measure.",
    evidenceGuidance: "What to Show / Evidence:\n- A policy on acceptable internet usage.\n- Screenshots of the web filter configuration showing blocked categories.\n- Reports from the web filtering solution."
  },
  "Is there a policy that defines acceptable web usage?": {
    description: "Meaning:\nThis verifies that the organization has clearly communicated to its employees what is considered appropriate and inappropriate use of company internet access.",
    evidenceGuidance: "What to Show / Evidence:\n- A formal Acceptable Use Policy (AUP).\n- Employee handbook section on internet use.\n- Signed acknowledgements of the AUP."
  },
  "Is the use of cryptography governed by a policy?": {
    description: "Meaning:\nThis verifies that the organization has formal rules for when and how to use encryption to protect data confidentiality and integrity, covering data at rest (on disks) and data in transit (over the network).",
    evidenceGuidance: "What to Show / Evidence:\n- A formal cryptography policy or cryptographic controls policy.\n- A data classification policy that specifies encryption requirements for different data types.\n- A list of approved cryptographic algorithms and standards."
  },
  "Is there a process for managing cryptographic keys throughout their lifecycle?": {
    description: "Meaning:\nThis checks for a secure process for generating, distributing, storing, rotating, and destroying cryptographic keys. Proper key management is critical; weak key management can render strong cryptography useless.",
    evidenceGuidance: "What to Show / Evidence:\n- A key management policy and procedures.\n- Documentation of the key management system (KMS) or hardware security module (HSM) used.\n- Logs related to key generation, rotation, and revocation."
  },
  "Is information security integrated into all phases of the software development lifecycle (SDLC)?": {
    description: "Meaning:\nThis control verifies that security is not an afterthought but is built into the process of creating software from the beginning. This includes security requirements gathering, secure design, secure coding, and security testing.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented secure SDLC process.\n- Evidence of security activities in project plans (e.g., threat modeling, code reviews).\n- Security requirements in user stories or functional specifications."
  },
  "Are developers trained in secure coding practices?": {
    description: "Meaning:\nThis checks if the organization provides its developers with the knowledge and skills they need to write code that is resilient to common vulnerabilities (like those in the OWASP Top 10).",
    evidenceGuidance: "What to Show / Evidence:\n- A developer training plan.\n- Records of completed secure coding training (e.g., certificates, course attendance).\n- Internal secure coding guidelines or standards."
  },
  "Are development, testing, and production environments logically or physically separated?": {
    description: "Meaning:\nThis is a critical control to prevent accidental changes to live systems and to protect production data. It ensures that development work does not impact the operational environment.",
    evidenceGuidance: "What to Show / Evidence:\n- Network diagrams showing the separation of environments.\n- Access control lists that prevent developers from accessing production systems directly."
  },
  "Is access to production environments tightly controlled and restricted?": {
    description: "Meaning:\nThis verifies that only a limited number of authorized personnel (typically operations staff) can access and make changes to the live production environment. Developer access should be prohibited or highly restricted.",
    evidenceGuidance: "What to Show / Evidence:\n- An access control policy for production systems.\n- A list of personnel with access to production and the justification.\n- Audit logs of access to production servers."
  },
  "Is security testing, such as penetration testing and vulnerability scanning, performed on a regular basis?": {
    description: "Meaning:\nThis control checks that the organization proactively looks for security weaknesses in its systems and applications through automated scanning and manual testing.",
    evidenceGuidance: "What to Show / Evidence:\n- A policy or program for security testing.\n- Reports from past penetration tests and vulnerability scans.\n- Records showing that identified vulnerabilities have been remediated."
  },
  "Are security tests performed before new systems or major changes go live?": {
    description: "Meaning:\nThis verifies that security is a go/no-go criterion for new deployments. It ensures that major new systems or features are security tested before they are exposed to real-world threats.",
    evidenceGuidance: "What to Show / Evidence:\n- Change management records that include a security testing sign-off.\n- Penetration test reports for pre-production systems."
  },
  "Is the use of production data for testing purposes restricted and controlled?": {
    description: "Meaning:\nThis control aims to protect sensitive live data from being exposed in less secure test environments. It requires the organization to avoid using real data for testing whenever possible.",
    evidenceGuidance: "What to Show / Evidence:\n- A policy on the use of data in non-production environments.\n- A formal request and approval process for using production data in testing."
  },
  "If production data is used, is it anonymized or masked before being used in test environments?": {
    description: "Meaning:\nThis verifies that when production data must be used for testing, any sensitive or personal information is removed or obfuscated (masked) to protect it.",
    evidenceGuidance: "What to Show / Evidence:\n- Procedures for data masking/anonymization.\n- Screenshots or scripts used to mask the data."
  },
  "Is there a formal secure development policy or standard that developers must follow?": {
    description: "Meaning:\nThis checks for a high-level document that sets out the organization's rules and requirements for building secure software. It acts as the foundation for all secure development activities.",
    evidenceGuidance: "What to Show / Evidence:\n- The official Secure Development Policy document.\n- Communication records showing the policy has been distributed to all developers."
  },
  "Does the policy cover secure coding guidelines, vulnerability handling, and use of third-party components?": {
    description: "Meaning:\nThis assesses the completeness of the secure development policy. It should address key areas like specific coding standards (e.g., how to prevent SQL injection), a process for handling discovered vulnerabilities, and rules for using open-source or commercial libraries.",
    evidenceGuidance: "What to Show / Evidence:\n- Specific sections within the policy addressing these topics.\n- References to external standards like OWASP secure coding guidelines.\n- A documented vulnerability disclosure process."
  },
  "Are development environments (including tools like code repositories, CI/CD pipelines) adequately secured?": {
    description: "Meaning:\nThis control ensures that the infrastructure used to build software is itself protected from attack. A compromised development pipeline could be used to inject malicious code into the final product.",
    evidenceGuidance: "What to Show / Evidence:\n- Security configuration standards for development tools.\n- Access control settings for the code repository and CI/CD server.\n- Audit logs for critical development systems."
  },
  "Is access to development environments restricted to authorized personnel?": {
    description: "Meaning:\nThis verifies that only individuals who are part of the development team can access the tools and infrastructure used for software development.",
    evidenceGuidance: "What to Show / Evidence:\n- A list of users with access to development systems.\n- Role-based access control configurations for development tools."
  },
  "Are security requirements included in contracts with third-party developers?": {
    description: "Meaning:\nThis ensures that when development work is outsourced, the external party is contractually obligated to follow the organization's security standards.",
    evidenceGuidance: "What to Show / Evidence:\n- Standard contract templates for outsourced development with security clauses.\n- Specific contracts with third-party development firms."
  },
  "Does the organization review and test the security of code delivered by outsourcers?": {
    description: "Meaning:\nThis control verifies that the organization does not blindly trust code from external developers. It requires a process to independently assess the security of the delivered software before accepting and deploying it.",
    evidenceGuidance: "What to Show / Evidence:\n- A process document for reviewing third-party code.\n- Reports from security scans (SAST/DAST) run on outsourced code.\n- Code review records."
  },
  "Is there a formal change management process for all changes to production systems?": {
    description: "Meaning:\nThis is a fundamental IT governance control. It ensures that all changes to the live environment are planned, tested, reviewed, and approved in a structured way to minimize the risk of outages or security issues.",
    evidenceGuidance: "What to Show / Evidence:\n- A documented change management policy and procedure.\n- Records of change requests from a ticketing system (e.g., Jira, ServiceNow).\n- Meeting minutes from a Change Advisory Board (CAB)."
  },
  "Are all changes tested and approved before being deployed?": {
    description: "Meaning:\nThis checks that the change management process includes mandatory steps for testing (to ensure the change works as expected) and formal approval (to ensure the change is authorized and its risks are accepted).",
    evidenceGuidance: "What to Show / Evidence:\n- Test plans and results attached to change records.\n- Evidence of approvals (digital or physical signatures) in the change management system."
  },
  "Are duties and areas of responsibility separated, in order to reduce opportunities for unauthorized modification or misuse of information, or services.": {
    description: "Meaning: This control verifies that no single person has sole control over a critical process, reducing the risk of fraud or error. For example, the person who can create a new user account should not be the same person who can approve access rights.",
    evidenceGuidance: "What to Show / Evidence: - A documented Segregation of Duties policy. - Role definitions and access control matrices that demonstrate the separation. - System configurations preventing a single user from performing conflicting actions."
  },
  "Does the management demonstrate support of the information security policy, topic-specific policies, procedures and information security controls.": {
    description: "Meaning: This checks for active, visible support from leadership. It's not enough for policies to exist; management must lead by example, allocate resources, and hold people accountable for information security.",
    evidenceGuidance: "What to Show / Evidence: - Minutes from management meetings where information security is discussed. - Communications from leadership (emails, newsletters) emphasizing security. - Budget approvals for security initiatives."
  },
  "Is there a documented policy/procedure describing process for collecting, analyzing and evaluating information related to information security threats.": {
    description: "Meaning: This control assesses whether the organization has a formal program to gather intelligence about emerging threats, vulnerabilities, and attack methods. This allows the organization to be proactive rather than reactive.",
    evidenceGuidance: "What to Show / Evidence: - A documented threat intelligence procedure. - Subscriptions to threat feeds or security information sharing groups (ISACs). - Reports summarizing threat intelligence and its impact on the organization."
  },
  "Is there a documented policy/procedure describing process to ensure information security risks related to projects and deliverables are effectively addressed in project management throughout the project life cycle.": {
    description: "Meaning: This verifies that information security is not an afterthought in projects. It checks that security risk assessments are part of the project initiation phase and that security tasks are included in project plans.",
    evidenceGuidance: "What to Show / Evidence: - Project management methodology documentation that includes security checkpoints. - Examples of project plans with security-related tasks and deliverables. - Risk assessments conducted for new projects."
  },
  "Is there an inventory of all assets associated with information and information processing facilities.": {
    description: "Meaning: This control verifies that the organization knows what it needs to protect. There should be a comprehensive and maintained list of all important assets, including hardware, software, data, and services.",
    evidenceGuidance: "What to Show / Evidence: - The asset inventory register (e.g., in a spreadsheet, CMDB). - The documented procedure for asset inventory management, including additions and removals. - Records showing the inventory is regularly reviewed and updated."
  },
  "Is there a documented policy/procedure describing process to ensure information and other associated assets are appropriately protected, used and handled.": {
    description: "Meaning: This checks for a formal policy that defines the 'rules of the road' for all users when they handle company information and use IT assets. It sets expectations for behavior.",
    evidenceGuidance: "What to Show / Evidence: - The Acceptable Use Policy (AUP). - Signed acknowledgement forms from employees. - Security awareness training materials that cover acceptable use."
  },
  "Is there a documented policy/procedure describing process to classify information and assets based on the criticality and sensitivity of the information.": {
    description: "Meaning: This control verifies that the organization categorizes its information based on its sensitivity (e.g., Public, Internal, Confidential, Restricted). This classification then determines the level of protection required.",
    evidenceGuidance: "What to Show / Evidence: - The information classification policy and scheme. - Examples of documents or data repositories with classification labels. - Access control policies that are based on information classification levels."
  },
  "Is there a documented policy/procedure describing process to label the information within the organization.": {
    description: "Meaning: This checks that once information is classified, it is marked (labeled) so that users know its sensitivity and how to handle it correctly. This applies to both digital documents (e.g., headers/footers) and physical media.",
    evidenceGuidance: "What to Show / Evidence: - Information labeling procedures. - Screenshots of document templates with classification labels. - Examples of physical media with labels. - Configuration of Data Loss Prevention (DLP) tools that use labels."
  },
  "Is there a documented policy/procedure describing process to maintain the security of information transferred within an organization and with any external interested parties.": {
    description: "Meaning: This control verifies that there are rules and technical controls in place to protect data when it moves from one location to another, both internally (e.g., between servers) and externally (e.g., to a partner or customer).",
    evidenceGuidance: "What to Show / Evidence: - Information transfer policy. - Procedures for using secure file transfer methods (e.g., SFTP, encrypted email). - Agreements with third parties that define secure transfer requirements."
  },
  "Is there a documented policy/procedure describing process to manage logical and physical access to information, assets and information processing assets.": {
    description: "Meaning: This is the high-level policy that establishes the organization's overall approach to access control. It should state the core principles, such as 'least privilege', and assign responsibilities for managing access.",
    evidenceGuidance: "What to Show / Evidence: - The master Access Control Policy document. - The policy should be approved by management and communicated to relevant personnel."
  },
  "Are the employees provided with unique IDs for accessing information, assets and information processing facilities.": {
    description: "Meaning: This fundamental control ensures that every user has a unique identifier. This is essential for accountability, as it allows actions to be traced back to a specific individual.",
    evidenceGuidance: "What to Show / Evidence: - User account creation procedures. - A list of active user accounts, showing no generic or shared accounts are used for regular user access. - System configurations that enforce unique user IDs."
  },
  "Is there a documented policy/procedure describing process to distribute or assign authentication credentials for employees.": {
    description: "Meaning: This verifies that there is a secure process for managing passwords and other authenticators (like MFA tokens). It covers how passwords are created, distributed, and reset.",
    evidenceGuidance: "What to Show / Evidence: - Password management policy. - Procedures for user registration and de-registration. - Documented process for password resets, including identity verification steps."
  },
  "Are the assess rights assigned considering the business requirements and individual's roles and responsibilities.": {
    description: "Meaning: This checks that access rights are not granted arbitrarily. There must be a formal process for provisioning, reviewing, modifying, and revoking access based on job roles and responsibilities.",
    evidenceGuidance: "What to Show / Evidence: - Access provisioning and de-provisioning procedures. - Role-Based Access Control (RBAC) matrix. - Completed access request forms showing approvals. - Logs of periodic access reviews."
  },
  "Is there a documented policy/procedure describing process to manage information security risks associated with the use of supplier’s products or services.": {
    description: "Meaning: This control verifies that the organization assesses and manages the security risks that arise from using third-party suppliers. This includes everything from cloud services to outsourced cleaning staff.",
    evidenceGuidance: "What to Show / Evidence: - A third-party risk management policy/program. - Due diligence questionnaires sent to new vendors. - A risk register of suppliers. - Contracts with security clauses."
  },
  "Are the information security requirements included in contracts established with suppliers and service providers?": {
    description: "Meaning: This ensures that security expectations are legally binding. Contracts with suppliers should clearly define their information security responsibilities, including incident reporting, right to audit, and compliance with the organization's policies.",
    evidenceGuidance: "What to Show / Evidence: - Standard contract templates with a dedicated information security section. - Signed agreements with key suppliers. - A legal review process for supplier contracts."
  },
  "Do supplier agreements include requirements to address information security within the ICT products and services supply chain?": {
    description: "Meaning: This control addresses the risk of supply chain attacks. It verifies that the organization requires its suppliers to ensure the security of their own supply chains, especially for critical software and hardware.",
    evidenceGuidance: "What to Show / Evidence: - Contract clauses requiring suppliers to manage their supply chain risks. - Evidence of asking suppliers for a Software Bill of Materials (SBOM). - Supplier questionnaires that inquire about their supply chain security practices."
  },
  "Is there a high-level Information Security Policy that has been defined and approved by top management?": {
    "description": "This assesses if the foundational document for the ISMS exists and has the necessary authority from leadership.",
    "evidenceGuidance": "Show the main Information Security Policy document with a clear approval section (e.g., signatures, date)."
  },
  "Does the Information Security Policy set the direction and principles for information security within the organization?": {
    "description": "This checks if the policy provides a clear framework and states the organization's commitment to information security.",
    "evidenceGuidance": "Review the policy for a mission statement, objectives, and a commitment to continual improvement."
  },
  "Are there topic-specific policies (e.g., Access Control, Acceptable Use, Cryptography) that support the main policy?": {
    "description": "This verifies that detailed rules exist for specific security domains, providing actionable guidance.",
    "evidenceGuidance": "Provide a list or library of all topic-specific policies. Show how they link back to the main policy."
  },
  "Is there a documented process for reviewing and approving all policies before they are published?": {
    "description": "This ensures that policies are accurate, complete, and authorized before being enforced.",
    "evidenceGuidance": "Show the policy on 'Policy Management' or a similar procedure. Provide change logs or meeting minutes from policy review committees."
  },
  "Are policies communicated to all personnel and relevant interested parties in an accessible format?": {
    "description": "This checks if the organization makes a conscious effort to ensure everyone who needs to know the policies can find and understand them.",
    "evidenceGuidance": "Provide records of communications (emails, intranet posts). Show the location of policies on the company intranet or portal."
  },
  "Is there a mechanism to track acknowledgement of policies by personnel (e.g., signed forms, digital acceptance)?": {
    "description": "This verifies that the organization can prove personnel have received and acknowledged their responsibilities under the policies.",
    "evidenceGuidance": "Show reports from a training/HR system with policy acknowledgements. Provide examples of signed acknowledgement forms."
  },
  "Is there a defined schedule for reviewing all policies (e.g., annually)?": {
    "description": "This ensures that policies are proactively kept up-to-date and don't become obsolete.",
    "evidenceGuidance": "Provide the policy review schedule. Show document properties or version history indicating regular reviews."
  },
  "Is there a trigger for ad-hoc policy reviews, such as after a significant security incident or change in the legal/regulatory environment?": {
    "description": "This checks for a reactive process to update policies when circumstances change, ensuring they remain relevant.",
    "evidenceGuidance": "Show a post-incident report that recommends a policy update. Provide change management records that trigger a policy review."
  },
  "Is the responsibility for developing, reviewing, and approving policies clearly assigned?": {
    "description": "This verifies that there is clear ownership for the policy lifecycle.",
    "evidenceGuidance": "Show RACI matrix for policy management. Look for defined roles (e.g., Policy Owner) in the policy documents themselves."
  },
  "Is the physical security perimeter clearly defined (e.g., using walls, fences, or other physical barriers)?": { description: "Checks that the boundary of the secure area is unambiguous and physically established.", evidenceGuidance: "Site plans, building blueprints. Photographs of the perimeter fences, walls, and doors." },
  "Are risk assessments conducted to determine the required strength and type of perimeter protection?": { description: "Verifies that the design of the perimeter (e.g., fence height, door strength) is based on a formal assessment of physical threats.", evidenceGuidance: "Physical security risk assessment reports. Justification documents for the type of perimeter controls chosen." },
  "Are there clear signs at the perimeter indicating that it is a protected area?": { description: "Ensures that individuals are warned that they are entering a restricted or monitored area, which acts as a deterrent.", evidenceGuidance: "Photographs of signage at entrances (e.g., 'Authorized Access Only', 'Area Under Video Surveillance')." },
  "Is the perimeter regularly inspected for signs of damage, wear, or attempted breaches?": { description: "Checks for a proactive maintenance process to ensure the perimeter remains effective.", evidenceGuidance: "Logs or checklists from physical security patrols. Maintenance records for fences, gates, and doors." },
  "Is a formal physical access control system (e.g., key cards, biometrics) in place for secure areas?": { description: "Verifies the use of technology to enforce entry controls, rather than relying on manual processes.", evidenceGuidance: "Documentation of the access control system. Photographs of card readers or biometric scanners at doorways." },
  "Is there a documented procedure for issuing, modifying, and revoking physical access credentials?": { description: "Ensures the lifecycle of access cards or keys is managed securely.", evidenceGuidance: "Physical access control procedures. Completed access request and termination forms. Audit logs from the access control system." },
  "Are visitor access procedures in place, including sign-in, identification, and escort requirements?": { description: "Checks for a formal process to manage non-employees, ensuring they are identified and supervised.", evidenceGuidance: "Visitor management policy. Visitor sign-in logs (digital or physical). Visitor badges." },
  "Are entry points (doors, windows) physically robust and secured with appropriate locks?": { description: "Verifies that the entry points themselves are resistant to forced entry.", evidenceGuidance: "Specifications for doors and locks. Maintenance records for locking mechanisms." },
  "Are offices and rooms containing sensitive information kept locked when unattended?": { description: "Checks for compliance with basic security hygiene to prevent opportunistic theft or access.", evidenceGuidance: "Clear Desk and Clear Screen policy. Security awareness materials. Observations from a physical walkthrough." },
  "Is there a key management process to control the distribution and return of physical keys?": { description: "Ensures that traditional keys are tracked and accounted for.", evidenceGuidance: "Key management policy. A register of key holders. Procedures for handling lost keys." },
  "Are sensitive areas designed to minimize the risk of unauthorized observation (e.g., from outside windows)?": { description: "Verifies that facility design considers the threat of eavesdropping or visual spying.", evidenceGuidance: "Building design documents. Photographs of privacy films on windows or office layouts that shield screens from view." },
  "Are CCTV cameras positioned to cover critical areas, entrances, and exits?": { description: "Checks that video surveillance provides effective coverage of key locations.", evidenceGuidance: "CCTV camera layout diagrams. The CCTV policy document." },
  "Is CCTV footage stored securely for a defined period and protected from tampering?": { description: "Ensures that video evidence is available and reliable when needed.", evidenceGuidance: "CCTV retention policy. Access control settings for the video management system (VMS). Audit logs of who has accessed footage." },
  "Are intruder alarm systems installed and regularly tested?": { description: "Verifies that systems designed to detect breaches are operational.", evidenceGuidance: "Alarm system design documents. Maintenance and testing records from the alarm company." },
  "Is there a defined process for responding to alarms from physical monitoring systems?": { description: "Ensures that alerts are not ignored and are handled in a consistent manner.", evidenceGuidance: "Incident response procedures for physical security events. Logs from the alarm monitoring center showing response actions." },
  "Are fire detection and suppression systems (e.g., smoke detectors, sprinklers) installed and regularly maintained?": { description: "Checks for protection against fire, a common and destructive threat.", evidenceGuidance: "Maintenance and inspection certificates for fire alarms and suppression systems. Building safety records." },
  "Is critical equipment protected from water damage (e.g., located away from pipes, raised floors)?": { description: "Verifies that measures are in place to prevent damage from leaks or floods.", evidenceGuidance: "Data center design documents. Photographs of water detection sensors or raised flooring." },
  "Are environmental controls (e.g., for temperature and humidity) in place for data centers and server rooms?": { description: "Ensures that IT equipment operates within safe environmental conditions to prevent failures.", evidenceGuidance: "Logs and alerts from environmental monitoring systems. Maintenance records for HVAC systems." },
  "Are business continuity and disaster recovery plans in place to address physical threats?": { description: "Checks that the organization has planned how to recover from a physical disaster.", evidenceGuidance: "The Business Continuity Plan (BCP) and Disaster Recovery (DR) plan documents." },
};


const enrichQuestions = (questions: (string | Question)[]): Question[] => {
  const priorities: QuestionPriority[] = ['Essential', 'Advanced', 'Optional'];
  return questions.map((q, index) => {
    const questionText = typeof q === 'string' ? q : q.text;
    if (typeof q === 'object' && q.text && q.description && q.evidenceGuidance) {
        // If it's already a rich question object, use it
        return q;
    }

    const priority = priorities[index % priorities.length];
    const content = questionContentMap[questionText] || {
      description: `Meaning:\nThe assessor is asking whether the organization has a formal, documented process or control for this item. This involves verifying that a standardized approach exists and is followed consistently.`,
      evidenceGuidance: `What to Show / Evidence:\nProvide relevant policy documents, procedure manuals, system configuration screenshots, or audit logs that demonstrate the implementation and operation of this control.`
    };
    return {
      text: questionText,
      priority: priority,
      description: content.description,
      evidenceGuidance: content.evidenceGuidance,
    };
  });
};


const ISO_27001_SECTIONS: SectionData[] = [
    {
    "id": "iso-clauses",
    "title": "ISO :27001 Clauses",
    "description": "Core requirements for establishing, implementing, maintaining and continually improving an ISMS.",
    "color": "yellow",
    "icon": LockIcon,
    "subSections": [
      {
        "id": "4.1",
        "title": "4.1 Understanding organization and its context",
        "questions": enrichQuestions([
          "Have the internal and external issues that are relevant to the organization's ISMS determined",
          "Is there a documented process for identifying and reviewing these issues regularly?",
          "Have impact and the risk associated to the issues determined",
          "Have the remediation plan for issues documented"
        ])
      },
      {
        "id": "4.2",
        "title": "4.2 Understanding the needs and expectations of interested parties",
        "questions": enrichQuestions([
          "Has the organization determined the interested parties that are relevant to the ISMS",
          "Has the organization determined the needs and expectations of these interested parties",
          "Have the requirements of these interested parties been determined, including legal, regulatory and contractual requirements?",
          "Is there a process to review and update the list of interested parties and their requirements?"
        ])
      },
      {
        "id": "4.3",
        "title": "4.3 Determining the scope of the information security management system",
        "questions": enrichQuestions([
          "Have the boundaries and applicability of the ISMS been determined to establish its scope, taking into consideration the external and internal issues, the requirements of interested parties and the interfaces and dependencies with other organizations?",
          "Has the organization defined the scope of ISMS including the in scope departments, interfaces, dependences and the locations",
          "Is the scope statement clear about what is included and what is excluded?",
          "Is ISMS scope been documented"
        ])
      },
       {
        "id": "5.1",
        "title": "5.1 Leadership and commitment",
        "questions": enrichQuestions([
          "Is the organization’s leadership commitment to the ISMS demonstrated by establishing the information security policy and objectives, compatible with the strategic direction of the organization, and in promotion of continual improvement?",
          "Has the leadership ensured the integration of the ISMS requirements into its business processes?",
          "Does leadership actively participate in management reviews of the ISMS?",
          "Has the leadership ensured resources are available for the ISMS, and directing and supporting individuals, including management, who contribute to its effectiveness?",
          "Has the leadership communicated the importance of effective information security and conformance to ISMS requirements?",
          "Has the leadership directing and supporting relevant roles to contribute to the effectiveness of ISMS"
        ])
      },
      {
        "id": "5.2",
        "title": "5.2 Policy",
        "questions": enrichQuestions([
          "Is there an established information security policy that is appropriate to ISMS",
          "Does the information security policy gives a framework for setting objectives, and demonstrates commitment for continual improvement of ISMS",
          "Is the policy reviewed at planned intervals (e.g., annually) or when significant changes occur?",
          "Is the policy documented and communicated to employees and relevant interested parties?"
        ])
      },
      {
        "id": "5.3",
        "title": "5.3 Organizational roles, responsibilities and authorities",
        "questions": enrichQuestions([
          "Are the roles, responsibilities & authorities relevant to ISMS scope clearly defined and communicated?",
          "Is the Org Chart defined and inline with the defined roles and responsibilities",
          "Are the responsibilities and authorities for conformance and reporting on ISMS performance assigned?",
          "Do personnel understand their assigned roles and responsibilities?"
        ])
      },
       {
        "id": "6.1",
        "title": "6.1 Actions to address risks and opportunities",
        "questions": enrichQuestions([
          "Have the internal and external issues, and the requirements of interested parties been considered to determine the risks and opportunities that need to be addressed to ensure that the ISMS achieves its outcome",
          "Have actions to address risks and opportunities been planned, and integrated into the ISMS processes, and are they evaluated for effectiveness?",
          "Is there a process for regularly reviewing and updating the assessment of risks and opportunities?",
          "Has an information security risk assessment process that establishes the criteria for performing information security risk assessments, including risk acceptance criteria been defined?",
          "Is the information security risk assessment process repeatable and does it produce consistent, valid and comparable results?"
        ])
      },
      {
        "id": "6.1.2",
        "title": "6.1.2 Information security risk assessment",
        "questions": enrichQuestions([
          "Does the information security risk assessment process identify risks associated with loss of confidentiality, integrity and availability for information within the scope of the ISMS, and are risk owners identified?",
          "Are information security risks analysed to assess the realistic likelihood and potential consequences that would result, if they were to occur, and have the levels of risk been determined?",
          "Are information security risks compared to the established risk criteria and prioritised?",
          "Are risk assessments performed at planned intervals or when significant changes are proposed or occur?",
          "Is documented information about the information security risk assessment process available?"
        ])
      },
      {
        "id": "6.1.3",
        "title": "6.1.3 Information security risk treatment",
        "questions": enrichQuestions([
          "Is there an information security risk treatment process to select appropriate risk treatment options for the results of the information security risk assessment, and are controls determined to implement the risk treatment option chosen?",
          "Have the controls determined, been compared with ISO/IEC 27001:2022 Annex A to verify that no necessary controls have been missed?",
          "Has a Statement of Applicability been produced to justify Annex A exclusions, and inclusions together with the control implementation status?",
          "Is the Statement of Applicability regularly reviewed and updated?",
          "Has the organization formulated an information security risk treatment plan and obtained the risk owners approval for residual risk acceptance"
        ])
      },
      {
        "id": "6.2",
        "title": "6.2 Information security objectives and planning to achieve them",
        "questions": enrichQuestions([
          "Have measurable ISMS objectives and targets been established, documented and communicated throughout the organization?",
          "Are the objectives consistent with the information security policy?",
          "Are objectives reviewed and updated as part of the management review process?",
          "In setting its objectives, has the organization determined what needs to be done, when and by whom?",
          "Is everyone within the organization’s control aware of the importance of the information security policy, their contribution to the effectiveness of the ISMS and the implications of not conforming?",
          "Has the organization determined the need for internal and external communications relevant to the ISMS, including what to communicate, when, with whom, and who by, and the processes by which this is achieved?"
        ])
      },
      {
        "id": "7.1",
        "title": "7.1 Resources",
        "questions": enrichQuestions([
          "Has the organization determined the resources needed for ISMS",
          "Are sufficient resources (people, financial, technical) allocated to establish, implement, maintain, and continually improve the ISMS?"
        ])
      },
      {
        "id": "7.2",
        "title": "7.2 Competence",
        "questions": enrichQuestions([
          "Has the organization determined the competency of the persons relevant to ISMS",
          "Is there a process for evaluating the competence of individuals performing work affecting ISMS performance?",
          "Has the organization taken corrective measures to acquire the necessary competency of the persons relevant to ISMS",
          "Has the organization retained information as evidence for showcasing that the persons relevant to ISMS have necessary competency"
        ])
      },
      {
        "id": "7.3",
        "title": "7.3 Awareness",
        "questions": enrichQuestions([
          "Has the organization defined and documented Information Security Awareness Plan",
          "Does the employees undergo security awareness sessions upon hire and on periodic basis",
          "Does the awareness program cover current threats, such as phishing and social engineering?",
          "Does the organization have a method to evaluate the effectiveness of the awareness training",
          "How does the organization ensures that the employees are aware about the information security policy",
          "Are the employees aware of the implications of not confirming to information security requirements"
        ])
      },
      {
        "id": "7.4",
        "title": "7.4 Communication",
        "questions": enrichQuestions([
          "Has the organization developed internal and external communication plan",
          "Does the communication plan include the details of what to share, when to share, whom to share, how to share and with whom to share",
          "Is there a process for handling communications during a security incident?"
        ])
      },
      {
        "id": "7.5",
        "title": "7.5 Documented Information (7.5.1, 7.5.2, 7.5.3)",
        "questions": enrichQuestions([
          "Has the organization determined the documented information necessary for the effectiveness of the ISMS?",
          "Is the documented information in the appropriate format, and has it been identified, reviewed and approved for suitability?",
          "Has the organization defined naming conventions including (document tittle, date, author & approval)",
          "While creating and updating the documents does the organization ensure the integrity of the documents by capturing version numbers and appropriate approvals",
          "Is there a master list of documents to track all ISMS documentation?",
          "Does the organization have a process to control the distribution of its documented information to ensure it is only available for intended persons",
          "Does the organization protects the documented information from loss of confidentiality, integrity and availability",
          "Is the documented information properly stored and adequately preserved for its legibility",
          "Has the organization identified and documentation of external origin",
          "Is there a documented procedure for the retention and disposal of documents?"
        ])
      },
      {
        "id": "8.1",
        "title": "8.1 Operational planning and control",
        "questions": enrichQuestions([
          "Does the organization has a programme to ensure that the ISMS achieves its outcomes, requirements and objectives been developed and implemented?",
          "Is documented evidence retained to demonstrate that processes have been carried out as planned?",
          "Are criteria for the processes established?",
          "Are changes planned and controlled, and unintended changes reviewed to mitigate any adverse results?",
          "How does the organization control outsourced processes/services relevant to ISMS",
          "Does the organization have documented information as an evidence to ensure that the processes are carried out and implemented as planned."
        ])
      },
      {
        "id": "8.2",
        "title": "8.2 Information security risk assessment",
        "questions": enrichQuestions([
          "Are information security risk assessments performed at planned intervals or when significant changes occur, and is documented information retained?",
          "Does the risk assessment process produce consistent and comparable results?",
          "Does the organization retain relevant documented information of the results of the information security risk assessments"
        ])
      },
      {
        "id": "8.3",
        "title": "8.3 Information security risk treatment",
        "questions": enrichQuestions([
          "Has the information security risk treatment plan been implemented as per the information risk treatment plan",
          "Are the results of the risk treatment plan monitored for effectiveness?",
          "Does the organization retain relevant documented information of the results of the information security risk treatment"
        ])
      },
      {
        "id": "9.1",
        "title": "9.1 Monitoring, measurement, analysis and evaluation",
        "questions": enrichQuestions([
          "Is the information security performance and effectiveness of the ISMS evaluated?",
          "How does the organization determine the processes and controls that needs to be monitored and controlled",
          "How does the organization determine the methods for monitoring, measurement, analysis and evaluation of security processes and controls",
          "How does the organization ensure that the selected methods produce comparable, repeatable and reproducible results",
          "Has the organization determined the frequency for monitoring, measurement, analysis and evaluation of security processes and controls",
          "Has the organization determined when to analyze the results of monitoring, measurement, analysis and evaluation of security processes and controls",
          "Are the results of monitoring and measurement used as input for the management review?",
          "Has the organization determined what needs to be monitored and measured, when, and by whom",
          "Is documented information retained as evidence of the results of monitoring and measurement?"
        ])
      },
      {
        "id": "9.2",
        "title": "9.2 Internal audit",
        "questions": enrichQuestions([
          "Does the organization plan, establish, implement and maintain an internal audit program",
          "Has the organization defined the frequency of internal audits",
          "Has the organization defined the objective and criteria for the internal audit",
          "Has the organization defined the frequency, methods, responsibilities and requirements for the audit program",
          "Are internal audits conducted periodically to check that the ISMS is effective and conforms to both ISO/IEC 27001:2022 and the organization’s requirements?",
          "Does the audit program take into consideration of importance of the process during the audit",
          "Are the audits performed by competent personnel",
          "How does the organization ensure objectivity and impartiality of the audit",
          "Are nonconformities identified during audits formally tracked to remediation?",
          "Are the results of the internal audit reported to relevant management personnel",
          "Are results of audits reported to management, and is documented information about the audit programme and audit results retained?"
        ])
      },
      {
        "id": "9.3",
        "title": "9.3 Management review",
        "questions": enrichQuestions([
          "Does the review consider results from previous management reviews",
          "Does the Top Management review the effectiveness of ISMS at planned intervals",
          "Is there a defined agenda for management review meetings?",
          "Does the review consider changes to the internal and external issues",
          "Does the review consider changes to the needs and expectations of interested parties",
          "Does the review consider the non conformities and corrective actions",
          "Does the review consider monitoring and measurement results",
          "Does the review consider audit results",
          "Does the review consider feedback from interested parties",
          "Does the review consider results of risk assessment and risk treatment",
          "Does the review consider opportunities for continual improvement",
          "Does the outputs of the review include decisions related to continual improvement and any needs for changes to ISMS",
          "Are action items from the management review assigned, tracked, and verified?",
          "Has the organization retained documented information as evidence for the results of management reviews",
          "Are the results of the management review documented, acted upon and communicated to interested parties as appropriate?"
        ])
      },
      {
        "id": "10.1",
        "title": "10.1 Continual improvement",
        "questions": enrichQuestions([
          "Does the organization continually improve the suitability, adequacy and effectiveness of the ISMS",
          "Is there evidence of improvements made to the ISMS based on the results of analysis and evaluation?"
        ])
      },
      {
        "id": "10.2",
        "title": "10.2 Nonconformity and corrective action",
        "questions": enrichQuestions([
          "What are the steps taken by the organization on the non conformities identified",
          "Does the organization takes actions to control and correct the non conformities",
          "Is there a process for logging and tracking all nonconformities?",
          "Does the organization identifies the root cause for the non conformity",
          "Does the organization take steps to eliminate the root cause",
          "Does the organization take steps to identify similar non conformities within the organization.",
          "Does the Organization take steps to review the effectiveness of corrective actions taken'",
          "Is documented information retained as evidence of the nature of non-conformities, actions taken and the results?"
        ])
      }
    ]
  },
  {
    "id": "a.5",
    "title": "A.5 - Organizational Controls",
    "description": "Define the organization's governance, policies, and processes to manage information security systematically.",
    "color": "green",
    "icon": ShieldIcon,
    "subSections": [
      {
        "id": "A.5.1",
        "title": "5.1 Policies for information security",
        "description": "Information security policy and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel and relevant interested parties, and reviewed at planned intervals and if significant changes occur.",
        "questions": enrichQuestions([
          "Is there a high-level Information Security Policy that has been defined and approved by top management?",
          "Does the Information Security Policy set the direction and principles for information security within the organization?",
          "Are there topic-specific policies (e.g., Access Control, Acceptable Use, Cryptography) that support the main policy?",
          "Is there a documented process for reviewing and approving all policies before they are published?",
          "Are policies communicated to all personnel and relevant interested parties in an accessible format?",
          "Is there a mechanism to track acknowledgement of policies by personnel (e.g., signed forms, digital acceptance)?",
          "Is there a defined schedule for reviewing all policies (e.g., annually)?",
          "Is there a trigger for ad-hoc policy reviews, such as after a significant security incident or change in the legal/regulatory environment?",
          "Is the responsibility for developing, reviewing, and approving policies clearly assigned?"
        ])
      },
      {
        "id": "A.5.2",
        "title": "5.2 Information security roles and responsibilities",
        "description": "Information security roles and responsibilities shall be defined and allocated according to the organization needs.",
        "questions": enrichQuestions([
          "Are the employees properly briefed on their information security roles and responsibilities prior to being granted access to the organization’s information and other associated assets.",
          "Are information security responsibilities included in job descriptions?",
          "Are responsibilities for the protection of individual assets and Responsibilities for information security risk management activities and in particular for acceptance of residual risks should be defined."
        ])
      },
       {
        "id": "A.5.3",
        "title": "5.3 Segregation of duties",
        "description": "Conflicting duties and conflicting areas of responsibility shall be segregated.",
        "questions": enrichQuestions([
          "Are duties and areas of responsibility separated, in order to reduce opportunities for unauthorized modification or misuse of information, or services.",
          "Where segregation of duties is not feasible, are compensating controls (e.g., monitoring, audit trails) implemented?",
          "Is there a periodic review of roles and responsibilities to ensure segregation of duties is maintained?"
        ])
      },
      {
        "id": "A.5.4",
        "title": "5.4 Management responsibilities",
        "description": "Management shall require all personnel to apply information security in accordance with the established information security policy, topic-specific policies and procedures of the organization.",
        "questions": enrichQuestions([
          "Does the management demonstrate support of the information security policy, topic-specific policies, procedures and information security controls.",
          "Does the management ensures that personnel achieve a level of awareness of information security relevant to their roles and responsibilities within the organization.",
          "Does management actively promote a positive security culture?",
          "Does the management ensures that personnel are provided with adequate resources and project planning time for implementing the organization’s security-related processes and controls."
        ])
      },
      {
        "id": "A.5.5",
        "title": "5.5 Contact with authorities",
        "description": "The organization shall establish and maintain contact with relevant authorities.",
        "questions": enrichQuestions([
          "Is there a procedure documenting when, and by whom, contact with relevant authorities (law enforcement etc.) will be made.",
          "Have relevant authorities (e.g., data protection authorities, national CERTs) been identified?",
          "Is there a process, which details how and when contact, is required?",
          "Is there a process for routine contact and intelligence sharing."
        ])
      },
      {
        "id": "A.5.6",
        "title": "5.6 Contact with special interest groups",
        "description": "The organization shall establish and maintain contact with special interest groups or other specialist security forums and professional associations.",
        "questions": enrichQuestions([
          "Do relevant individuals within the organisation maintain active membership in relevant special interest groups.",
          "Does the organization subscribe to security mailing lists or forums?",
          "Does relevant individuals within the organization gain knowledge about best practices and stay up to date with relevant security information.",
          "Does relevant individuals within the organization share and exchange information about new technologies, products, services, threats or vulnerabilities."
        ])
      },
      {
        "id": "A.5.7",
        "title": "5.7 Threat intelligence",
        "description": "Information relating to information security threats shall be collected and analyzed to produce threat intelligence.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process for collecting, analyzing and evaluating information related to information security threats.",
          "Does the threat intelligence program ensure that the information collected related to information security threats are relevant, insightful, contextual and actionable.",
          "Is threat intelligence used to inform risk assessments and the selection of controls?",
          "Does the threat intelligence program has a formal process for identifying, vetting and selecting internal and external information security threat sources and analyzing information to understand the impact to the organization."
        ])
      },
      {
        "id": "A.5.8",
        "title": "5.8 Information security in project management",
        "description": "Information security shall be integrated into project management.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to ensure information security risks related to projects and deliverables are effectively addressed in project management throughout the project life cycle.",
          "Are the information security risks assessed and treated at an early stage and periodically as part of project risks throughout the project life cycle.",
          "Are security requirements included as part of the project's acceptance criteria?",
          "Are the requirements regards to compliance with the legal, statutory, regulatory and contractual requirements considered throughout the project management life cycle?"
        ])
      },
      {
        "id": "A.5.9",
        "title": "5.9 Inventory of information and other associated assets",
        "description": "An inventory of information and other associated assets, including owners, shall be developed and maintained.",
        "questions": enrichQuestions([
          "Is there an inventory of all assets associated with information and information processing facilities.",
          "Does the inventory include both hardware, software, information, and services?",
          "Is the inventory accurate and kept up to date.",
          "Are the asset owners identified and tagged to all assets.",
          "Is the asset inventory updated when assets are procured, decommissioned or disposed."
        ])
      },
      {
        "id": "A.5.10",
        "title": "5.10 Acceptable use of information and other associated assets",
        "description": "Rules for the acceptable use and procedures for handling information and other associated assets shall be identified, documented and implemented.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to ensure information and other associated assets are appropriately protected, used and handled.",
          "Is the policy approved by the management.",
          "Is the policy communicated to all individuals of the organization.",
          "Does the policy cover topics such as internet usage, email, mobile devices, and social media?",
          "Does the policy at minimum covers expected and unacceptable behaviors of employees from an information security perspective."
        ])
      },
      {
        "id": "A.5.11",
        "title": "5.11 Return of assets",
        "description": "Personnel and other interested parties as appropriate shall return all the organization’s assets in their possession upon change or termination of their employment, contract or agreement.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure all employees and external users return the organisation's assets on termination of their employment, contract or agreement.",
          "Does the asset return process include both physical (laptops, phones) and logical (data, software) assets?",
          "Is the organization following the defined process for collecting all physical and electronic assets provided to the employee."
        ])
      },
      {
        "id": "A.5.12",
        "title": "5.12 Classification of information",
        "description": "Information shall be classified according to the information security needs of the organization based on confidentiality, integrity, availability and relevant interested party requirements.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to classify information and assets based on the criticality and sensitivity of the information.",
          "Are the requirements for confidentiality, integrity and availability considered for the classification.",
          "Is the classification scheme defined and followed for information classification.",
          "Are there at least three classification levels (e.g., Public, Internal, Confidential)?",
          "Are the information owners involved in classifying the information under their control.",
          "Is there a defined process for declassifying or to change the classification of the information.",
          "Is the information classification reviewed on periodic basis."
        ])
      },
      {
        "id": "A.5.13",
        "title": "5.13 Labelling of information",
        "description": "An appropriate set of procedures for information labelling shall be developed and implemented in accordance with the information classification scheme adopted by the organization.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to label the information within the organization.",
          "Does the labelling process cover both digital and physical information?",
          "Are automated tools (e.g., DLP) used to assist with information labelling?",
          "Does the labelling process defined the contents to be included in the label."
        ])
      },
      {
        "id": "A.5.14",
        "title": "5.14 Information transfer",
        "description": "Information transfer rules, procedures, or agreements shall be in place for all types of transfer facilities within the organization and between the organization and other parties.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to maintain the security of information transferred within an organization and with any external interested parties.",
          "Are procedures for how data should be transferred made available to all employees.",
          "Are secure methods (e.g., encryption) required for transferring sensitive information?",
          "Are relevant technical controls in place to prevent non-authorised forms of data transfer",
          "Is there a documented policy and process detailing how physical media should be transported.",
          "Is media in transport protected against unauthorised access, misuse or corruption."
        ])
      },
      {
        "id": "A.5.15",
        "title": "5.15 Access control",
        "description": "Rules to control physical and logical access to information and other associated assets shall be established and implemented based on business and information security requirements.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to manage logical and physical access to information, assets and information processing assets.",
          "Is the policy based on business requirements.",
          "Does the policy enforce the principles of 'least privilege' and 'need-to-know'?",
          "Is the policy communicated appropriately.",
          "Does the access management include the principles of 'need-to-know' and 'need-to-use' for managing logical and physical access to information, assets and information processing facilities."
        ])
      },
      {
        "id": "A.5.16",
        "title": "5.16 Identity management",
        "description": "The full life cycle of identities shall be managed.",
        "questions": enrichQuestions([
          "Are the employees provided with unique IDs for accessing information, assets and information processing facilities.",
          "Is there a formal user registration and de-registration process?",
          "Shared user IDs/Accounts are only authorized when necessary for business purposes and after approvals",
          "Are the Identities removed/disabled when no longer needed."
        ])
      },
      {
        "id": "A.5.17",
        "title": "5.17 Authentication information",
        "description": "Allocation and management of authentication information shall be controlled by a management process, including advising personnel on appropriate handling of authentication information.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to distribute or assign authentication credentials for employees.",
          "Is there a documented policy/procedure describing the baseline requirements of authentication credentials(passwords/passphrases/PINs) used for accessing organization information, assets and information processing facilities.",
          "Does the password policy enforce minimum length, complexity, and history?",
          "Are the passwords/authentication credentials communicated to employees via a secured channel.",
          "Are the employees prompted to change the credentials upon first login.",
          "Is there a formal process for resetting authentication credentials."
        ])
      },
      {
        "id": "A.5.18",
        "title": "5.18 Access rights",
        "description": "Access rights to information and other associated assets shall be provisioned, reviewed, modified and removed in accordance with the organization’s topic-specific policy on and rules for access control.",
        "questions": enrichQuestions([
          "Are the assess rights assigned considering the business requirements and individual's roles and responsibilities.",
          "Is the principle of segregation of duties considered while provisioning access rights.",
          "are appropriate approvals taken from asset/information owners for provisioning or revoking access rights.",
          "Is there a predefined frequency for reviewing the access rights.",
          "Are access reviews conducted for both regular and privileged users?",
          "Are the access rights modified upon change of job role or termination."
        ])
      },
      {
        "id": "A.5.19",
        "title": "5.19 Information security in supplier relationships",
        "description": "Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of supplier’s products or services.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to manage information security risks associated with the use of supplier’s products or services.",
          "Are the vendors/suppliers evaluated with the organization's requirements for information security.",
          "Is there a process for ongoing monitoring of supplier security performance?",
          "Are the process defined for handling incidents and contingencies associated with supplier products and services.",
          "Are suppliers/vendors provided with documented security requirements?",
          "Is supplier/vendor's access to information assets & infrastructure controlled and monitored?"
        ])
      },
      {
        "id": "A.5.20",
        "title": "5.20 Addressing information security within supplier agreements",
        "description": "Relevant information security requirements shall be established and agreed with each supplier based on the type of supplier relationship.",
        "questions": enrichQuestions([
          "Are the information security requirements included in contracts established with suppliers and service providers?",
          "Do supplier agreements include clauses for incident notification, right to audit, and secure data handling?",
          "Does the contracts established with supplier and service providers include legal, statutory, regulatory, data protection, handling of personally identifiable information (PII), intellectual property rights and copyright requirements.",
          "Does the contracts established with supplier and service providers include rules of acceptable use of organization's information and information assets."
        ])
      },
      {
        "id": "A.5.21",
        "title": "5.21 Managing information security in the information and communication technology (ICT) supply chain",
        "description": "Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain.",
        "questions": enrichQuestions([
          "Do supplier agreements include requirements to address information security within the ICT products and services supply chain?",
          "Does the organization assess the supply chain risks of its critical ICT suppliers?",
          "Is there a process to verify the integrity of software and hardware from suppliers?"
        ])
      }
    ]
  },
  {
    "id": "a.6",
    "title": "A.6 - People Controls",
    "description": "Ensure that individuals are trustworthy and understand their information security responsibilities.",
    "color": "purple",
    "icon": PeopleIcon,
    "subSections": [
      {
        "id": "A.6.1",
        "title": "6.1 Screening",
        "description": "Background verification checks on all candidates for employment shall be carried out and documented in accordance with applicable laws, regulations and ethics.",
        "questions": enrichQuestions([
          "Is there a documented policy for screening candidates and third parties?",
          "Are screening checks proportionate to the sensitivity of the information to be accessed and the perceived risks?",
          "Are checks re-performed periodically for personnel in sensitive roles?",
          "Does the screening process verify identity, criminal record, professional qualifications, and employment history as permitted by law?",
          "Are screening requirements documented in job descriptions and third-party contracts?"
        ])
      },
      {
        "id": "A.6.2",
        "title": "6.2 Terms and conditions of employment",
        "description": "The contractual or other agreements with personnel and other interested parties shall state their and the organization's responsibilities for information security.",
        "questions": enrichQuestions([
          "Do employment contracts or agreements include a commitment to comply with the organization's information security policies?",
          "Are confidentiality and non-disclosure clauses included in all employment agreements?",
          "Do contracts define responsibilities for the protection of intellectual property?",
          "Do contracts specify the individual's responsibilities for protecting information and assets?",
          "Are responsibilities for acceptable use of assets and information clearly defined in employment terms?"
        ])
      },
      {
        "id": "A.6.3",
        "title": "6.3 Information security awareness, education and training",
        "description": "Personnel of the organization and relevant interested parties shall receive appropriate information security awareness, education and training and its regular updates.",
        "questions": enrichQuestions([
          "Is there a formal information security awareness and training program?",
          "Is awareness training provided to all new personnel upon joining the organization?",
          "Is regular refresher training conducted for all personnel (e.g., annually)?",
          "Is role-based training provided for personnel with specific security responsibilities (e.g., developers, system administrators)?",
          "Does training cover current threats, policies, and individual responsibilities?",
          "Are records of training completion maintained?"
        ])
      },
      {
        "id": "A.6.4",
        "title": "6.4 Disciplinary process",
        "description": "A disciplinary process shall be formalized and communicated to take action against personnel and other relevant interested parties who have committed an information security policy violation.",
        "questions": enrichQuestions([
          "Is there a formal, documented disciplinary process for information security breaches?",
          "Has the disciplinary process been communicated to all personnel?",
          "Is the process aligned with HR policies and local legislation?",
          "Does the process define different levels of sanctions for varying degrees of violations?",
          "Is the disciplinary process applied consistently and fairly?"
        ])
      },
      {
        "id": "A.6.5",
        "title": "6.5 Responsibilities after termination or change of employment",
        "description": "Information security responsibilities and duties that remain valid after termination or change of employment shall be defined, documented, enforced and communicated.",
        "questions": enrichQuestions([
          "Are ongoing responsibilities (e.g., confidentiality) clearly defined in termination or separation agreements?",
          "Is there a formal exit process that includes reminding departing personnel of their continuing obligations?",
          "Is there a process to ensure timely removal of access rights upon termination?",
          "Are legal actions considered for breaches of post-employment responsibilities?"
        ])
      },
      {
        "id": "A.6.6",
        "title": "6.6 Confidentiality or non-disclosure agreements",
        "description": "Confidentiality or non-disclosure agreements shall be used to protect the organization's information.",
        "questions": enrichQuestions([
          "Are confidentiality or non-disclosure agreements (NDAs) signed by all personnel, contractors, and relevant third parties?",
          "Do the agreements clearly define what constitutes confidential information?",
          "Have the agreements been reviewed by legal counsel?",
          "Do the agreements specify the duration of the confidentiality obligation?",
          "Is there a process for reviewing and updating NDA templates?"
        ])
      },
      {
        "id": "A.6.7",
        "title": "6.7 Remote working",
        "description": "Security measures shall be implemented when personnel are working remotely to protect information accessed, processed or stored outside the organization’s premises.",
        "questions": enrichQuestions([
            "Is there a formal policy covering the information security requirements for allowing personnel to work and access organization's information remotely.",
            "Is the remote working policy approved by the top management.",
            "Is the remote working policy communicated to all full-time, part-time and temporary staff who work remotely.",
            "Does the policy require the use of secure Wi-Fi (e.g., WPA2/WPA3) for remote work?",
            "Does the remote working policy consider physical security requirements.",
            "Does the remote working policy consider the communications security requirements.",
            "Does the policy mandate the use of company-approved VPN for accessing internal resources?",
            "Does the remote working policy consider the threat of unauthorized access to information or resources from other persons in public places.",
            "Does the remote working policy consider use of security measures, such as firewalls and protection against malware."
        ])
      },
      {
        "id": "A.6.8",
        "title": "6.8 Information security event reporting",
        "description": "The organization shall provide a mechanism for personnel to report observed or suspected information security events through appropriate channels in a timely manner.",
        "questions": enrichQuestions([
          "Are all full-time, part-time, and temporary staff made aware of their responsibility to report information security events.",
          "Are personnel trained on what constitutes a reportable security event?",
          "Are all full-time, part-time, and temporary staff made aware of the procedure for reporting information security.",
          "Is there a 'no-blame' culture encouraged for reporting events?",
          "Are all full-time, part-time, and temporary staff made aware of the communication contact details and communication medium for reporting security events?"
        ])
      }
    ]
  },
  {
    "id": "a.7",
    "title": "A.7 - Physical Controls",
    "description": "Prevent unauthorized physical access, damage, and interference to the organization’s information and facilities.",
    "color": "red",
    "icon": PhysicalSecurityIcon,
    "subSections": [
      {
        "id": "A.7.1",
        "title": "7.1 Physical security perimeters",
        "description": "Security perimeters shall be defined and used to protect areas that contain information and other associated assets.",
        "questions": enrichQuestions([
            "Is the physical security perimeter clearly defined (e.g., using walls, fences, or other physical barriers)?",
            "Are there different security zones defined based on the sensitivity of the assets within them?",
            "Are risk assessments conducted to determine the required strength and type of perimeter protection?",
            "Are there clear signs at the perimeter indicating that it is a protected area?",
            "Is the perimeter regularly inspected for signs of damage, wear, or attempted breaches?"
        ])
      },
      {
        "id": "A.7.2",
        "title": "7.2 Physical entry",
        "description": "Secure areas shall be protected by appropriate entry controls.",
        "questions": enrichQuestions([
            "Is a formal physical access control system (e.g., key cards, biometrics) in place for secure areas?",
            "Is there a documented procedure for issuing, modifying, and revoking physical access credentials?",
            "Are physical access logs reviewed regularly for suspicious activity?",
            "Are visitor access procedures in place, including sign-in, identification, and escort requirements?",
            "Are entry points (doors, windows) physically robust and secured with appropriate locks?"
        ])
      },
      {
        "id": "A.7.3",
        "title": "7.3 Securing offices, rooms and facilities",
        "description": "Security measures for securing offices, rooms and facilities shall be designed and implemented.",
        "questions": enrichQuestions([
          "Are offices and rooms containing sensitive information kept locked when unattended?",
          "Is there a key management process to control the distribution and return of physical keys?",
          "Are lock combinations or codes changed when personnel with knowledge of them leave the organization?",
          "Are sensitive areas designed to minimize the risk of unauthorized observation (e.g., from outside windows)?"
        ])
      },
      {
        "id": "A.7.4",
        "title": "7.4 Physical security monitoring",
        "description": "Premises shall be continuously monitored for unauthorized physical access.",
        "questions": enrichQuestions([
          "Are CCTV cameras positioned to cover critical areas, entrances, and exits?",
          "Is CCTV footage stored securely for a defined period and protected from tampering?",
          "Does CCTV signage comply with local privacy laws and regulations?",
          "Are intruder alarm systems installed and regularly tested?",
          "Is there a defined process for responding to alarms from physical monitoring systems?"
        ])
      },
      {
        "id": "A.7.5",
        "title": "7.5 Protecting against physical and environmental threats",
        "description": "Protection against physical and environmental threats shall be designed and implemented.",
        "questions": enrichQuestions([
            "Are fire detection and suppression systems (e.g., smoke detectors, sprinklers) installed and regularly maintained?",
            "Is critical equipment protected from water damage (e.g., located away from pipes, raised floors)?",
            "Are environmental controls (e.g., for temperature and humidity) in place for data centers and server rooms?",
            "Is the building protected against power surges and lightning?",
            "Are business continuity and disaster recovery plans in place to address physical threats?"
        ])
      },
      {
        "id": "A.7.6",
        "title": "7.6 Working in secure areas",
        "description": "Security measures for working in secure areas shall be designed and implemented.",
        "questions": enrichQuestions([
            "Are procedures for working in secure areas designed and implemented?",
            "Are personnel trained on the specific rules for working in secure areas (e.g., data centers)?",
            "Are unsupervised work activities in secure areas controlled?",
            "Is the use of personal devices (e.g., cameras, mobile phones) restricted within secure areas?",
            "Are visitors and third parties always escorted within secure areas?"
        ])
      },
      {
        "id": "A.7.7",
        "title": "7.7 Clear desk and clear screen",
        "description": "Rules for a clear desk and clear screen shall be defined and appropriately enforced.",
        "questions": enrichQuestions([
            "Is there a formal Clear Desk and Clear Screen policy?",
            "Are employees required to lock their computers when leaving their workspace?",
            "Are sensitive documents stored in lockable cabinets when not in use?",
            "Are printouts containing sensitive information collected promptly from printers?",
            "Are unattended printers and fax machines secured?"
        ])
      },
      {
        "id": "A.7.8",
        "title": "7.8 Equipment siting and protection",
        "description": "Equipment shall be sited and protected to reduce risks from environmental threats and hazards and opportunities for unauthorized access.",
        "questions": enrichQuestions([
          "Is equipment placed to minimize unauthorized viewing of screens?",
          "Is critical equipment protected from public access areas?",
          "Are food and drink prohibited in secure areas where IT equipment is located?",
          "Are environmental factors like temperature, humidity, and dust considered when siting equipment?",
          "Is equipment physically secured (e.g., with locks or in locked racks) to prevent theft?"
        ])
      },
      {
        "id": "A.7.9",
        "title": "7.9 Security of assets off-premises",
        "description": "Assets off-premises shall be protected.",
        "questions": enrichQuestions([
          "Is there a policy for securing assets used outside the organization's premises?",
          "Are technical controls like full-disk encryption and remote wipe capabilities implemented on mobile devices?",
          "Are users trained on securing devices in public places (e.g., against theft or shoulder surfing)?",
          "Are there rules for connecting to untrusted networks (e.g., public Wi-Fi)?",
          "Is there a procedure for reporting lost or stolen devices?"
        ])
      },
      {
        "id": "A.7.10",
        "title": "7.10 Storage media",
        "description": "Storage media shall be managed through their life cycle of procurement, use, transport and disposal in accordance with the organization’s classification scheme and handling requirements.",
        "questions": enrichQuestions([
          "Is there a policy for the management of removable media (e.g., USB drives, external hard drives)?",
          "Is the use of removable media restricted or controlled?",
          "Is sensitive data on removable media encrypted?",
          "Is there a formal authorization process for taking media off-site?",
          "Is there a secure process for the sanitization or destruction of media before disposal?"
        ])
      },
      {
        "id": "A.7.11",
        "title": "7.11 Supporting utilities",
        "description": "Information processing facilities shall be protected from power failures and other disruptions caused by failures in supporting utilities.",
        "questions": enrichQuestions([
          "Is critical equipment supported by an uninterruptible power supply (UPS)?",
          "Are backup power sources like generators available for extended outages?",
          "Is there sufficient fuel for generators to meet business continuity requirements?",
          "Are supporting utilities like HVAC and internet connectivity redundant?",
          "Are UPS and generator systems regularly tested and maintained?"
        ])
      },
      {
        "id": "A.7.12",
        "title": "7.12 Cabling security",
        "description": "Power and telecommunications cabling carrying data or supporting information services shall be protected from interception, interference or damage.",
        "questions": enrichQuestions([
          "Is network and power cabling protected from physical damage (e.g., in conduits or cable trays)?",
          "Are network access points (e.g., wall sockets) in public areas disabled or secured?",
          "Are network closets and server rooms kept locked and access controlled?",
          "Is sensitive network cabling protected from unauthorized interception or tapping?",
          "Are power and data cables separated to prevent interference?"
        ])
      },
      {
        "id": "A.7.13",
        "title": "7.13 Equipment maintenance",
        "description": "Equipment shall be correctly maintained to ensure continued availability, integrity and confidentiality of information.",
        "questions": enrichQuestions([
          "Is there a schedule for preventative equipment maintenance?",
          "Are maintenance activities logged and records kept?",
          "Are security requirements enforced during maintenance, especially by third parties?",
          "Is sensitive information removed from equipment before it is sent for off-site maintenance?",
          "Is faulty equipment securely handled to prevent data leakage before repair or disposal?"
        ])
      },
      {
        "id": "A.7.14",
        "title": "7.14 Secure disposal or re-use of equipment",
        "description": "Items of equipment containing storage media shall be verified to ensure that any sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use.",
        "questions": enrichQuestions([
            "Is there a formal policy and procedure for the secure disposal or re-use of equipment?",
            "Are secure data erasure techniques or physical destruction used to sanitize storage media?",
            "Is a certificate of destruction obtained when using a third-party disposal service?",
            "Are records of equipment disposal and data destruction maintained?",
            "Is licensed software removed before equipment is re-used or disposed of?"
        ])
      }
    ]
  },
  {
    "id": "a.8",
    "title": "A.8 - Technological Controls",
    "description": "Ensure the secure operation of information processing facilities and protect against technical vulnerabilities.",
    "color": "teal",
    "icon": TechnologicalIcon,
    "subSections": [
        {
            "id": "A.8.1",
            "title": "8.1 User endpoint devices",
            "description": "Information stored on, processed by or accessible via user endpoint devices shall be protected.",
            "questions": enrichQuestions([
                "Is there a policy for securing user endpoint devices (laptops, desktops, mobile phones)?",
                "Is a Mobile Device Management (MDM) or Unified Endpoint Management (UEM) solution used to enforce policies?",
                "Is full-disk encryption enforced on all endpoint devices?",
                "Are endpoint devices protected by anti-malware software that is centrally managed and updated?",
                "Are endpoint firewalls configured and enabled?",
                "Are endpoint devices configured with screen locks that activate after a period of inactivity?"
            ])
        },
        {
            "id": "A.8.2",
            "title": "8.2 Privileged access rights",
            "description": "The allocation and use of privileged access rights shall be limited and controlled.",
            "questions": enrichQuestions([
                "Is there a formal policy for managing privileged access?",
                "Are privileged access rights restricted to the minimum necessary for a user's role?",
                "Are privileged accounts prohibited from being used for regular activities like email and web browsing?",
                "Is the use of privileged accounts logged and regularly reviewed?",
                "Is multi-factor authentication required for all privileged access?",
                "Are just-in-time (JIT) access or Privileged Access Management (PAM) solutions used?"
            ])
        },
        {
            "id": "A.8.3",
            "title": "8.3 Information access restriction",
            "description": "Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control.",
            "questions": enrichQuestions([
                "Is access to information and systems restricted based on the principle of least privilege ('need-to-know')?",
                "Is a role-based access control (RBAC) model implemented?",
                "Are access restrictions implemented through technical controls (e.g., file permissions, ACLs)?",
                "Is there a formal process for periodic review of user access rights?",
                "Are access rights to sensitive information systems tightly controlled and documented?"
            ])
        },
        {
            "id": "A.8.4",
            "title": "8.4 Access to source code",
            "description": "Read and write access to source code, development tools and software libraries shall be appropriately managed.",
            "questions": enrichQuestions([
                "Is access to source code restricted to authorized developers only?",
                "Are changes to source code managed through a version control system with access controls?",
                "Is read access to source code granted on a need-to-know basis?",
                "Are branch protection rules used to enforce code reviews before merging?",
                "Are sensitive credentials or secrets prevented from being stored in source code repositories?"
            ])
        },
        {
            "id": "A.8.5",
            "title": "8.5 Secure authentication",
            "description": "Secure authentication technologies and procedures shall be implemented based on information access restrictions and the topic-specific policy on access control.",
            "questions": enrichQuestions([
                "Is there a formal password policy defining minimum complexity, length, and history?",
                "Are passwords stored securely (e.g., using a strong, salted hashing algorithm)?",
                "Is multi-factor authentication (MFA) enforced for all external access (e.g., VPN, cloud services)?",
                "Is MFA enforced for access to critical internal systems and for all privileged users?",
                "Are default passwords changed on all systems and applications upon installation?"
            ])
        },
        {
            "id": "A.8.6",
            "title": "8.6 Capacity management",
            "description": "The use of resources shall be monitored and tuned in line with current and expected capacity requirements.",
            "questions": enrichQuestions([
                "Is system capacity (e.g., CPU, memory, storage) monitored to ensure performance and availability?",
                "Is there a process for capacity planning to project future needs?",
                "Are performance trends analyzed to predict future requirements?",
                "Are alerts configured to notify administrators of capacity thresholds being reached?",
                "Are capacity reports regularly reviewed by management?"
            ])
        },
        {
            "id": "A.8.7",
            "title": "8.7 Protection against malware",
            "description": "Protection against malware shall be implemented and be supported by appropriate user awareness.",
            "questions": enrichQuestions([
                "Is anti-malware protection deployed on all servers and endpoint devices?",
                "Are anti-malware signatures and software kept up to date automatically?",
                "Are periodic full-system scans performed?",
                "Is email and web traffic scanned for malicious content?",
                "Are controls in place to prevent the execution of unauthorized software?",
                "Are users trained on how to identify and report phishing and malware attempts?"
            ])
        },
        {
            "id": "A.8.8",
            "title": "8.8 Management of technical vulnerabilities",
            "description": "Information about technical vulnerabilities of information systems being used shall be obtained in a timely way, the organization’s exposure to such vulnerabilities evaluated and appropriate measures taken to address the associated risk.",
            "questions": enrichQuestions([
                "Is there a formal vulnerability management program?",
                "Are regular vulnerability scans conducted on internal and external systems?",
                "Are vulnerability information sources (e.g., vendor advisories, threat intelligence) monitored?",
                "Are vulnerabilities prioritized based on risk (e.g., using CVSS scores)?",
                "Are patches and remediations applied within a defined timeframe based on vulnerability severity?"
            ])
        },
        {
            "id": "A.8.9",
            "title": "8.9 Configuration management",
            "description": "Configurations, including security configurations, of hardware, software, services and networks shall be established, documented, implemented, monitored and reviewed.",
            "questions": enrichQuestions([
                "Are secure configuration baselines defined and implemented for all systems?",
                "Are baselines based on industry best practices (e.g., CIS Benchmarks)?",
                "Is there a process to manage and review changes to system configurations?",
                "Are tools used to monitor for configuration drift?",
                "Are all unnecessary ports, services, and accounts disabled on systems?"
            ])
        },
        {
            "id": "A.8.10",
            "title": "8.10 Information deletion",
            "description": "Information stored in information systems, devices or in any other storage media shall be deleted when no longer required.",
            "questions": enrichQuestions([
                "Is there a data retention policy with a defined schedule for information deletion?",
                "Are secure deletion techniques used to ensure data cannot be recovered?",
                "Is information in temporary storage (e.g., caches, temp files) securely deleted?",
                "Is there a process for users to request the deletion of their information (where applicable by law)?",
                "Are automated processes used to delete information that has exceeded its retention period?"
            ])
        },
        {
            "id": "A.8.11",
            "title": "8.11 Data masking",
            "description": "Data masking shall be used in accordance with the organization’s topic-specific policy on access control and other related topic-specific policies, and business requirements, taking applicable legislation into consideration.",
            "questions": enrichQuestions([
                "Is data masking or anonymization used to protect sensitive data in non-production environments (e.g., testing, development)?",
                "Is there a policy that defines when and how data masking should be applied?",
                "Are different masking techniques (e.g., substitution, shuffling, redaction) used based on data type?",
                "Is access to the original, unmasked data tightly controlled?",
                "Is the effectiveness of data masking periodically reviewed?"
            ])
        },
        {
            "id": "A.8.12",
            "title": "8.12 Information backup",
            "description": "Backup copies of information, software and systems shall be maintained and regularly tested in accordance with the topic-specific policy on backup.",
            "questions": enrichQuestions([
                "Is there a formal backup policy defining what is backed up, how often, and the retention period?",
                "Are backups stored in a secure, geographically separate location?",
                "Is access to backup media and systems restricted?",
                "Are backup copies encrypted?",
                "Are backup restore tests conducted on a regular schedule to ensure their viability?"
            ])
        },
        {
            "id": "A.8.13",
            "title": "8.13 Logging",
            "description": "Logs that record activities, exceptions, faults and other relevant events shall be produced, stored, protected and analysed.",
            "questions": enrichQuestions([
                "Is there a logging policy that defines what events are logged and for how long?",
                "Are sufficient details logged to enable incident investigation (e.g., user ID, timestamp, activity)?",
                "Are logs from critical systems collected into a central repository (e.g., a SIEM)?",
                "Are logs protected from tampering or unauthorized access?",
                "Are logs regularly reviewed for signs of malicious activity or security incidents?"
            ])
        },
        {
            "id": "A.8.14",
            "title": "8.14 Clock synchronization",
            "description": "The clocks of all relevant information processing systems shall be synchronized with an approved time source.",
            "questions": enrichQuestions([
                "Are all servers, network devices, and critical systems synchronized to a common, authoritative time source (e.g., NTP)?",
                "Is the time synchronization infrastructure monitored for failures?",
                "Is the use of an internal, hierarchical NTP structure implemented for large networks?",
                "Does the time synchronization standard include requirements for accuracy and stratum level?"
            ])
        },
        {
            "id": "A.8.15",
            "title": "8.15 Installation of software on operational systems",
            "description": "Procedures for the installation of software on operational systems shall be implemented.",
            "questions": enrichQuestions([
                "Is the installation of software on production systems restricted and controlled?",
                "Is there a formal change management process for installing new software or updates?",
                "Is all software obtained from reputable sources?",
                "Is all software tested for security vulnerabilities before being installed in production?",
                "Are technical controls (e.g., application whitelisting) used to prevent unauthorized software installation?"
            ])
        },
        {
            "id": "A.8.16",
            "title": "8.16 Network security",
            "description": "Networks and network devices shall be secured, managed and controlled to protect information in systems and applications.",
            "questions": enrichQuestions([
                "Are network security controls like firewalls and intrusion detection/prevention systems implemented?",
                "Are network devices (routers, switches) securely configured and managed?",
                "Is there a network diagram that is kept up to date?",
                "Is remote administrative access to network devices secured (e.g., using SSH, MFA)?",
                "Are firewall rules reviewed on a regular basis?"
            ])
        },
        {
            "id": "A.8.17",
            "title": "8.17 Security of network services",
            "description": "Security mechanisms, service levels and service requirements of network services shall be identified, implemented and monitored.",
            "questions": enrichQuestions([
                "Are security requirements defined and enforced for all network services (e.g., DNS, DHCP)?",
                "Are unnecessary network ports and services disabled?",
                "Are network services hardened according to best practices?",
                "Are network services protected against denial-of-service attacks?",
                "Is DNSSEC used to protect against DNS spoofing?"
            ])
        },
        {
            "id": "A.8.18",
            "title": "8.18 Segregation of networks",
            "description": "Groups of information services, users and information systems shall be segregated in the organization’s networks.",
            "questions": enrichQuestions([
                "Is network segmentation used to separate sensitive environments (e.g., production vs. development, PCI zone)?",
                "Are firewall rules in place to control traffic between network segments?",
                "Is wireless network traffic segregated from the wired corporate network?",
                "Is access between network segments restricted based on the principle of least privilege?",
                "Is the network segmentation scheme documented and regularly reviewed?"
            ])
        },
        {
            "id": "A.8.19",
            "title": "8.19 Web filtering",
            "description": "Access to external websites shall be managed to reduce exposure to malicious content.",
            "questions": enrichQuestions([
                "Is web filtering implemented to block access to known malicious or inappropriate websites?",
                "Is there a policy that defines acceptable web usage?",
                "Are categories such as malware, phishing, and command-and-control blocked?",
                "Are web filtering categories regularly updated?",
                "Is there a process for users to request exceptions to the web filter policy?"
            ])
        },
        {
            "id": "A.8.20",
            "title": "8.20 Use of cryptography",
            "description": "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.",
            "questions": enrichQuestions([
                "Is the use of cryptography governed by a policy?",
                "Is there a process for managing cryptographic keys throughout their lifecycle?",
                "Are strong, industry-standard cryptographic algorithms and protocols used?",
                "Are weak or deprecated cryptographic algorithms prohibited?",
                "Is sensitive data encrypted both at rest and in transit?"
            ])
        },
        {
            "id": "A.8.21",
            "title": "8.21 Secure development life cycle",
            "description": "Rules for the secure development of software and systems shall be established and applied.",
            "questions": enrichQuestions([
                "Is information security integrated into all phases of the software development lifecycle (SDLC)?",
                "Are developers trained in secure coding practices?",
                "Is threat modeling performed during the design phase of development?",
                "Are security checks (e.g., SAST, DAST) integrated into the development pipeline?",
                "Are security requirements defined at the start of a project?"
            ])
        },
        {
            "id": "A.8.22",
            "title": "8.22 Separation of development, testing and production environments",
            "description": "Development, testing and production environments shall be separated and secured.",
            "questions": enrichQuestions([
                "Are development, testing, and production environments logically or physically separated?",
                "Is access to production environments tightly controlled and restricted?",
                "Are developers prohibited from having direct access to production systems?",
                "Is production data protected from use in lower environments?",
                "Are different user accounts and credentials used for each environment?"
            ])
        },
        {
            "id": "A.8.23",
            "title": "8.23 System, network and application security testing",
            "description": "Security testing of systems, networks and applications shall be planned and carried out.",
            "questions": enrichQuestions([
                "Is security testing, such as penetration testing and vulnerability scanning, performed on a regular basis?",
                "Are security tests performed before new systems or major changes go live?",
                "Is a combination of automated (DAST, SAST) and manual testing used?",
                "Are security test results analyzed by competent personnel?",
                "Are the results of security tests formally documented and tracked to remediation?"
            ])
        },
        {
            "id": "A.8.24",
            "title": "8.24 Protection of test data",
            "description": "Test data shall be selected, protected and managed.",
            "questions": enrichQuestions([
                "Is the use of production data for testing purposes restricted and controlled?",
                "If production data is used, is it anonymized or masked before being used in test environments?",
                "Is there a formal approval process for using production data in test environments?",
                "Is test data securely deleted after testing is complete?",
                "Is access to test data controlled similarly to production data?"
            ])
        },
        {
            "id": "A.8.25",
            "title": "8.25 Secure development policy",
            "description": "Rules for the secure development of software and systems shall be established and applied to developments within the organization.",
            "questions": enrichQuestions([
                "Is there a formal secure development policy or standard that developers must follow?",
                "Does the policy cover secure coding guidelines, vulnerability handling, and use of third-party components?",
                "Does the policy require managing the security of open-source components (Software Composition Analysis)?",
                "Is the policy regularly reviewed and updated?",
                "Are developers trained on the secure development policy?"
            ])
        },
        {
            "id": "A.8.26",
            "title": "8.26 Secure development environment",
            "description": "The organization shall establish and appropriately protect secure development environments for system development and integration efforts that cover the entire system development life cycle.",
            "questions": enrichQuestions([
                "Are development environments (including tools like code repositories, CI/CD pipelines) adequately secured?",
                "Is access to development environments restricted to authorized personnel?",
                "Are development environments hardened to secure configuration standards?",
                "Are development tools and libraries kept up to date and scanned for vulnerabilities?",
                "Are security checks integrated into the CI/CD pipeline?"
            ])
        },
        {
            "id": "A.8.27",
            "title": "8.27 Outsourced development",
            "description": "The organization shall supervise and monitor the activity of outsourced system development.",
            "questions": enrichQuestions([
                "Are security requirements included in contracts with third-party developers?",
                "Does the organization review and test the security of code delivered by outsourcers?",
                "Does the organization have the right to audit the security practices of the outsourced developer?",
                "Are acceptance tests defined for the security of outsourced software?",
                "Are there clear procedures for handling vulnerabilities found in outsourced code?"
            ])
        },
        {
            "id": "A.8.28",
            "title": "8.28 Change management",
            "description": "Changes to information processing facilities and information systems shall be subject to change management procedures.",
            "questions": enrichQuestions([
                "Is there a formal change management process for all changes to production systems?",
                "Are all changes tested and approved before being deployed?",
                "Is a security review part of the change approval process?",
                "Is an impact assessment performed for all changes?",
                "Is there a backout plan for all changes?"
            ])
        }
    ]
  }
];

export const FRAMEWORKS: Framework[] = [
  {
    id: 'iso-27001',
    title: 'ISO/IEC 27001:2022 Audit',
    description: 'Comprehensive checklist for ISMS based on the latest ISO 27001 standard.',
    icon: ShieldIcon,
    sections: ISO_27001_SECTIONS,
  },
  {
    id: 'soc-2',
    title: 'SOC 2',
    description: 'Service Organization Control 2 audit framework for security, availability, etc.',
    icon: UsersIcon,
    sections: [], // "Coming Soon"
  },
  {
    id: 'pci-dss',
    title: 'PCI DSS v4.0',
    description: 'Payment Card Industry Data Security Standard for handling cardholder data.',
    icon: LockIcon,
    sections: [],
  }
];
