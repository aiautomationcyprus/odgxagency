import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// pages
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    meta_title: z.string().optional(),
    hero: z.object({
      title: z.string(),
      content: z.string(),
      buttons: z.array(
        z.object({
          enable: z.boolean().default(true),
          label: z.string(),
          link: z.string(),
        }),
      ),
      images: z.array(z.string()),
      client_logos: z.array(z.string()),
    }),
    feature: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
        images: z.array(z.string()),
        features: z.array(z.string()),
        button: z.object({
          enable: z.boolean().default(true),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
    video: z.object({
      title: z.string(),
      content: z.string(),
      video: z.object({
        cover: z.string(),
        link: z.string(),
      }),
      stats: z.array(
        z.object({
          key: z.string(),
          value: z.number(),
          prefix: z.string().optional(),
          suffix: z.string().optional(),
        }),
      ),
    }),
    reason: z.object({
      title: z.string(),
      points: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          image: z.string(),
        }),
      ),
    }),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({
      title: z.string(),
      content: z.string(),
      image_1: z.string(),
      image_2: z.string(),
      trust: z.object({
        title: z.string(),
        business: z.array(z.string()),
      }),
    }),
    value: z.object({
      title: z.string(),
      content: z.string(),
      points: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          image: z.string(),
        }),
      ),
    }),
    experience: z.object({
      title: z.string(),
      cards: z.array(
        z.union([
          z.object({
            type: z.literal("image"),
            image: z.string(),
          }),
          z.object({
            type: z.literal("video"),
          }),
          z.object({
            type: z.literal("info"),
            value: z.number(),
            suffix: z.string(),
            title: z.string(),
            content: z.string(),
          }),
        ]),
      ),
    }),
    team: z.object({
      title: z.string(),
      content: z.string(),
      members: z.array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string(),
        }),
      ),
    }),
  }),
});

const featuresCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/features" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({
      title: z.string(),
      content: z.string(),
      client_logos: z.array(z.string()).optional(), // ✅ ADD THIS LINE
      features: z.array(
        z.object({
          button: z.string(),
          title: z.string(),
          content: z.string(),
          image: z.string(),
          link: z.object({
            enable: z.boolean().default(true),
            label: z.string(),
            link: z.string(),
          }),
        }),
      ),
    }),
    benefit: z.object({
      title: z.string(),
      content: z.string(),
      benefits: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          image: z.string(),
          points: z.array(z.string()).optional(),
        }),
      ),
    }),
    trust: z.object({
      title: z.string(),
      content: z.string(),
      stats: z.array(
        z.object({
          company: z.string(),
          comment: z.string(),
          author: z.string(),
          name: z.string(),
          designation: z.string(),
          numbers: z.array(
            z.object({
              suffix: z.string(),
              value: z.number(),
              subtitle: z.string(),
            }),
          ),
        }),
      ),
      button: z.object({
        enable: z.boolean().default(true),
        label: z.string(),
        link: z.string(),
      }),
    }),
    more: z.object({
      title: z.string(),
      content: z.string(),
      points: z.array(
        z.object({
          icon: z.string(),
          details: z.string(),
        }),
      ),
    }),
    reason: z.object({
      title: z.string(),
      points: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          image: z.string(),
        }),
      ),
    }),
  }),
});


const pricingCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pricing" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    pricing_plans: z.object({
      title: z.string(),
      subtitle: z.string(),
      plans: z.array(
        z.object({
          name: z.string(),
        }),
      ),
      categories: z.array(
        z.object({
          name: z.string(),
          features: z.array(
            z.object({
              name: z.string(),
              tooltip: z.boolean(),
              values: z.array(z.union([z.boolean(), z.string()])),
            }),
          ),
        }),
      ),
    }),
  }),
});

const reviewCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/review" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    update: z.date().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z
      .object({
        title: z.string(),
        content: z.string(),
      })
      .optional(),

    date: z.date().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false).optional(),
  }),
});

const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    hero: z.object({
      title: z.string(),
      content: z.string(),
    }),
    contact: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
      }),
    ),
  }),
});

const changelogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/changelog" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    content: z.string(),
    logs: z.array(
      z.object({
        image: z.string(),
        version: z.string(),
        note: z.string(),
        date: z.date(),
      }),
    ),
  }),
});

const demoCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/demo" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      content: z.string(),
      points: z.array(z.string()),
    }),
  }),
});

const integrationCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/integration" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    hero: z.object({
      title: z.string(),
      content: z.string(),
    }),
    integrations: z.array(
      z.object({
        app: z.string(),
        icon: z.string(),
        content: z.string(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    update: z.date().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// sections
const callToActionSchema = defineCollection({
  loader: glob({
    pattern: "*/call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    title: z.string(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

const planCollection = defineCollection({
  loader: glob({ pattern: "*/plan.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    title: z.string(),
    pricing_tab: z.array(
      z.object({
        label: z.string(),
        type: z.string(),
        badge: z
          .object({
            enable: z.boolean().default(false),
            label: z.string(),
          })
          .optional(),
      }),
    ),
    pricing_card: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
        price: z.object({
          free: z.boolean(),
          custom: z.string().optional(),
          currency: z.string(),
          monthly_price: z.number(),
          yearly_price: z.number(),
        }),
        featured: z.boolean(),
        button: z.object({
          enable: z.boolean().default(true),
          label: z.string(),
          link: z.string(),
        }),
        service: z.object({
          title: z.string(),
          points: z.array(z.string()),
        }),
      }),
    ),
  }),
});

const faqCollection = defineCollection({
  loader: glob({ pattern: "*/faq.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    title_1: z.string(),
    title_2: z.string(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    contact: z.object({
      title: z.string(),
      button: z.object({
        enable: z.boolean().default(true),
        label: z.string(),
        link: z.string(),
      }),
    }),
  }),
});

const testimonialCollection = defineCollection({
  loader: glob({
    pattern: "*/testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean().default(true),
    title: z.string(),
    reviews: z.array(
      z.object({
        company: z.string(),
        review: z.string(),
        name: z.string(),
        author: z.string(),
        designation: z.string(),
      }),
    ),
  }),
});

// Export collections
export const collections = {
  // pages
  homepage: homepageCollection,
  about: aboutCollection,
  features: featuresCollection,
  pricing: pricingCollection,
  review: reviewCollection,
  blog: blogCollection,
  contact: contactCollection,
  changelog: changelogCollection,
  demo: demoCollection,
  integration: integrationCollection,
  pages: pagesCollection,

  // sections
  callToActionSection: callToActionSchema,
  planSection: planCollection,
  faqSection: faqCollection,
  testimonialSection: testimonialCollection,
};
