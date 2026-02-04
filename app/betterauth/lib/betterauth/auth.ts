import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma";
import { nextCookies } from "better-auth/next-js";
import { ac, admin, member, owner } from "./permissions";
import { getActiveOrganization } from "../../actions/organizations";
import { lastLoginMethod, organization } from "better-auth/plugins";
import { Resend } from "resend";
import OrganizationInvitationEmail from "../../components/emails/OrganizationInvitation";
import VerifyEmail from "@/app/betterauth/components/emails/VerifyEmail";
import ForgotPasswordEmail from "@/app/betterauth/components/emails/ResetPassword";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const prisma = new PrismaClient();
export const auth = betterAuth({
  role: {
    modelName: "RoleBetterAuth",
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("From /betterauth/lib/betterauth/auth : ========= ");
      console.log("Click URL to Verification Email : ========= ");
      console.log("username : ========= ", user);
      console.log("VerifyUrl : ========= ", url);
      console.log("userEmail : ========= ", user.email);
      // await resend.emails.send({
      //   from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
      //   to: user.email,
      //   subject: "Verify your email",
      //   react: VerifyEmail({ username: user.name, verifyUrl: url }),
      // });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID! as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    // },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      console.log("From /betterauth/lib/betterauth/auth : ========= ");
      console.log("Email And Password : Send Reset Password  ========= ");
      console.log("username : ========= ", user);
      console.log("userEmail : ========= ", user.name);
      console.log("Click URL to RESET PASSWORD : ========= ");
      console.log("resetUrl : ========= ", url);

      // await resend.emails.send({
      //   from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
      //   to: user.email,
      //   subject: "Reset your password",
      //   // text: `Click the link to reset your password: ${url}`,
      //   react: ForgotPasswordEmail({
      //     username: user.name,
      //     resetUrl: url,
      //     userEmail: user.email,
      //   }),
      // });
    },
    // requireEmailVerification: true,
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const activeOrganization = await getActiveOrganization(
            session.userId,
          );
          return {
            data: {
              ...session,
              activeOrganizationId: activeOrganization?.id,
            },
          };
        },
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql","sqlite" ...etc
  }),
  plugins: [
    organization({
      sendInvitationEmail: async (data) => {
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/better_auth/accept-invitation/${data.id}`;

        console.log("From /betterauth/lib/betterauth/auth : ========= ");
        console.log("Organization : ========= ");
        console.log("Send Invitation Email : ========= ");
        console.log("Data : ========= ");
        console.log("Data data.email : ========= ", data.email);
        console.log(
          "Data invitedByUsername : ========= ",
          data.inviter.user.name,
        );
        console.log("invitedByEmail : ========= ", data.inviter.user.email);
        console.log("teamName : ========= ", data.organization.name);
        console.log("Click InviteLink to Invite : ========= ");
        console.log("InviteLink : ========= ", inviteLink);

        // await resend.emails.send({
        //   from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        //   to: data.email,
        //   subject: "You've been invited to join our organization",
        //   react: OrganizationInvitationEmail({
        //     email: data.email,
        //     invitedByUsername: data.inviter.user.name,
        //     invitedByEmail: data.inviter.user.email,
        //     teamName: data.organization.name,
        //     inviteLink,
        //   }),
        // });
      },
      ac,
      roles: {
        owner,
        admin,
        member,
      },
    }),
    lastLoginMethod(),
    nextCookies(),
  ],
});
