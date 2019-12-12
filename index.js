/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log("MondayBot loaded!");

  app.on(["issues.opened", "issues.edited"], async context => {
    const issueContent = context.payload.issue.body;
    app.log("This is the issueContent:");
    app.log(issueContent.toString());

    let OOOtemplate = `## :calendar: Dates
_I'd like to request OOO from DATE1 to DATE2_


## :heavy_check_mark: Approval
- [ ] _manager_'s :+1:


## :clipboard: How are your responsibilities being covered?
**Customers:**
- How you will be backed up while you are out?

**Shipping:**
- Are any ships occurring for your team during this OOO? [yes/no]
- If yes, what are you doing to ensure your responsibilities will be covered?


## :footprints: Next steps
**Before OOO time:**
- [ ] :rescue_worker_helmet: Workday OOO request (only non-:us: Hubbers) opened
- [ ] :email: [Email auto-responder set](https://support.google.com/mail/answer/25922)
- [ ] :calendar: Google Calendar set to OOO time ([auto-declines](https://support.google.com/calendar/answer/7638168))
- [ ] :calendar: Recurring calendar events declined during OOO period
- [ ] :speech_balloon: Commented in this issue with \`/ ooo from M/D to M/D\`, e.g. \` / ooo from 5 / 16 to 5 / 20\`. This will:
  - :mega: Add your OOO time to [\`ooo[bot]\`](https://probot.github.io/apps/ooo/) to notify Hubbers that you're on OOO when they mention you in an issue while you're out
  - :chart_with_upwards_trend: Trigger an Actions Workflow to update the [Services schedule](https://docs.google.com/spreadsheets/d/1jaLzkVG3BmV2fPjcKoWPeq6kRXB9Lcpqk28r-DcPeZo/) on your behalf

**At start of OOO time:**
- [ ] :speech_balloon: Slack OOO message set
- [ ] :bust_in_silhouette: GitHub Profile status set (optional)

**At end of OOO time:**
- [ ]  :speech_balloon: Slack OOO message cleared
- [ ]  :email: Email auto-responder cleared (or auto-expired)
- [ ]  :bust_in_silhouette: GitHub Profile status cleared (optional)


## :bell: Awareness
- _team_ for awareness
`;

    let issueComment = "";

    if (
      context.payload.issue.body.match(
        /Created by Prem Kumar.P via monday.com integration. 🎉/
      )
    ) {
      issueComment = context.issue({
        body: OOOtemplate
      });
    } else {
      issueComment = context.issue({
        body: "This is NOT from Monday.com !"
      });
    }

    // // return context.github.issues.createComment(issueComment);

    // await addCustomLabel();
    // //context.github.issues.addLabels(["OOO"]);

    // async function addCustomLabel() {
    //   const labelsText = ["OOO"];
    //   // logic to check if label is availble esle create
    //   await context.github.issues.addLabels(labelsText);
    // }

    const labelsText = ["OOO"];
    await context.github.issues.addLabels(
      context.issue({ labels: labelsText })
    );

    await context.github.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
