const config = window.SANITY_CONFIG;

const isConfigured =
  config &&
  config.projectId &&
  config.projectId !== "YOUR_SANITY_PROJECT_ID" &&
  config.dataset;

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const byOrder = (items = []) =>
  [...items].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));

const blockText = (blocks = []) =>
  blocks
    .map((block) => (block.children || []).map((child) => child.text || "").join(""))
    .filter(Boolean)
    .join("\n\n");

const imageUrl = (image, width = 1600) => {
  const asset = image?.asset;
  if (!asset?._ref) return "";
  const [, id, dimensions, format] = asset._ref.match(/^image-(.+)-(\d+x\d+)-(\w+)$/) || [];
  if (!id || !dimensions || !format) return "";
  return `https://cdn.sanity.io/images/${config.projectId}/${config.dataset}/${id}-${dimensions}.${format}?w=${width}&auto=format`;
};

const setText = (selector, value) => {
  if (!value) return;
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
};

const setParagraphs = (selector, text) => {
  if (!text) return;
  const node = document.querySelector(selector);
  if (!node) return;
  node.innerHTML = String(text)
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
};

const setImage = (selector, image, alt) => {
  const url = imageUrl(image);
  if (!url) return;
  const img = document.querySelector(selector);
  if (!img) return;
  img.src = url;
  img.alt = alt || image.alt || img.alt || "";
};

const querySanity = async () => {
  const query = `{
    "site": *[_type == "siteSettings"][0],
    "about": *[_type == "aboutMe"][0],
    "journey": *[_type == "careerJourney"] | order(displayOrder asc, _createdAt asc),
    "photos": *[_type == "photoWallItem"] | order(featured desc, displayOrder asc, _createdAt desc),
    "travel": *[_type == "travelJournal"] | order(displayOrder asc, date desc),
    "art": *[_type == "artInspiration"] | order(displayOrder asc, _createdAt desc),
    "shanghai": *[_type == "shanghaiLife"][0],
    "motherhood": *[_type == "motherhoodSettings"][0],
    "journal": *[_type == "journalNote"] | order(displayOrder asc, date desc, _createdAt desc),
    "contact": *[_type == "contactSettings"][0]
  }`;

  const base = config.useCdn
    ? `https://${config.projectId}.apicdn.sanity.io`
    : `https://${config.projectId}.api.sanity.io`;
  const url = `${base}/v${config.apiVersion}/data/query/${config.dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
  return (await response.json()).result;
};

const renderHome = (site) => {
  if (!site) return;
  setText(".brand", site.signatureName);
  setText(".hero-signature", site.signatureName);
  setText(".hero h1", site.heroTitle);
  setText(".hero-copy", site.heroSubtitle);
  setText(".intro .section-kicker", site.introKicker);
  setText(".intro h2", site.introTitle);
  setParagraphs(".about-text", site.introductionText);
  setImage(".hero-image", site.heroImage, site.heroImage?.alt);
};

const renderAbout = (about) => {
  if (!about) return;
  const text = blockText(about.biography);
  if (text) setParagraphs(".about-text", text);
  const firstPhoto = about.profilePhotos?.[0];
  if (firstPhoto) setImage(".portrait-card img", firstPhoto, firstPhoto.alt);

  const caption = document.querySelector(".portrait-card figcaption");
  if (caption && (about.quotes?.length || about.interests?.length)) {
    const quote = about.quotes?.[0]?.quote || "Personal note";
    const interests = (about.interests || []).slice(0, 4).join(", ");
    caption.innerHTML = `<span>${escapeHtml(quote)}</span>${escapeHtml(interests)}`;
  }
};

const renderJourney = (items) => {
  if (!items?.length) return;
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  timeline.innerHTML = byOrder(items)
    .map((item, index) => `
      <article>
        <span class="chapter">${String(index + 1).padStart(2, "0")}</span>
        ${item.category ? `<p class="card-label">${escapeHtml(item.category)}</p>` : ""}
        <h3>${escapeHtml(item.role || item.company || "Career chapter")}</h3>
        <p>${escapeHtml([item.company, item.timePeriod].filter(Boolean).join(" / "))}</p>
        <p>${escapeHtml(item.description || "")}</p>
      </article>
    `)
    .join("");
};

const renderPhotoWall = (photos) => {
  if (!photos?.length) return;
  const wall = document.querySelector(".gallery-wall");
  if (!wall) return;
  wall.innerHTML = byOrder(photos)
    .map((item, index) => {
      const src = imageUrl(item.photo, 1400);
      if (!src) return "";
      const className = item.featured ? "wide" : index % 5 === 2 ? "tall" : "";
      const caption = [item.caption, item.location].filter(Boolean).join(" / ");
      return `
        <figure class="${className}">
          <img src="${src}" alt="${escapeHtml(item.alt || item.caption || "Photo wall image")}">
          <figcaption>${escapeHtml(caption)}</figcaption>
        </figure>
      `;
    })
    .join("");
};

const renderTravel = (posts) => {
  if (!posts?.length) return;
  const target = document.querySelector("[data-travel-journal-list]");
  if (!target) return;
  target.innerHTML = byOrder(posts)
    .map((post) => {
      const src = imageUrl(post.coverImage, 1200);
      return `
        <article class="travel-card">
          ${src ? `<img src="${src}" alt="${escapeHtml(post.title || "Travel journal cover")}">` : ""}
          <div>
            <p class="meta">${escapeHtml([post.location, post.date].filter(Boolean).join(" / "))}</p>
            <h3>${escapeHtml(post.title || "Travel note")}</h3>
            <p>${escapeHtml(post.shortDescription || blockText(post.fullText).slice(0, 180))}</p>
          </div>
        </article>
      `;
    })
    .join("");
};

const renderArt = (items) => {
  if (!items?.length) return;
  const strip = document.querySelector(".painting-strip");
  if (!strip) return;
  strip.innerHTML = byOrder(items)
    .map((item) => {
      const src = imageUrl(item.image, 1000);
      if (!src) return "";
      const caption = [item.artist, item.title].filter(Boolean).join(", ");
      return `
        <figure>
          <img src="${src}" alt="${escapeHtml(caption || "Art inspiration image")}">
          <figcaption>${escapeHtml(caption || item.category || "Inspiration")}</figcaption>
        </figure>
      `;
    })
    .join("");
};

const renderShanghai = (shanghai) => {
  if (!shanghai) return;
  setText("#shanghai .section-kicker", shanghai.kicker);
  setText("#shanghai h2", shanghai.title);
  setText("#shanghai .section-heading p:last-child", shanghai.description);
  setImage("#shanghai .life-feature img", shanghai.featureImage, shanghai.featureImage?.alt);
  const featureCaption = document.querySelector("#shanghai .life-feature figcaption");
  if (featureCaption && shanghai.featureImage?.caption) {
    featureCaption.textContent = shanghai.featureImage.caption;
  }

  const notes = byOrder(shanghai.notes || []);
  const noteTarget = document.querySelector("#shanghai .life-notes");
  if (noteTarget && notes.length) {
    noteTarget.innerHTML = notes
      .map((note) => `
        <article>
          <p class="meta">${escapeHtml(note.label || "")}</p>
          <h3>${escapeHtml(note.title || "")}</h3>
          <p>${escapeHtml(note.text || "")}</p>
        </article>
      `)
      .join("");
  }

  const photos = byOrder(shanghai.dailyPhotos || []);
  const photoTarget = document.querySelector("#shanghai .daily-strip");
  if (photoTarget && photos.length) {
    photoTarget.innerHTML = photos
      .map((photo) => {
        const src = imageUrl(photo, 1000);
        if (!src) return "";
        return `
          <figure>
            <img src="${src}" alt="${escapeHtml(photo.alt || photo.caption || "Shanghai daily life photo")}">
            <figcaption>${escapeHtml(photo.caption || "")}</figcaption>
          </figure>
        `;
      })
      .join("");
  }
};

const renderMotherhood = (motherhood) => {
  if (!motherhood) return;
  setText("#motherhood .section-kicker", motherhood.kicker);
  setText("#motherhood h2", motherhood.title);
  const paragraphs = document.querySelectorAll("#motherhood .motherhood-copy p:not(.section-kicker)");
  if (paragraphs[0] && motherhood.description) paragraphs[0].textContent = motherhood.description;
  if (paragraphs[1] && motherhood.secondParagraph) paragraphs[1].textContent = motherhood.secondParagraph;
  setImage("#motherhood figure img", motherhood.image, motherhood.image?.alt);
  const caption = document.querySelector("#motherhood figure figcaption");
  if (caption && motherhood.image?.caption) caption.textContent = motherhood.image.caption;
  const topics = motherhood.topics || [];
  const topicTarget = document.querySelector("#motherhood .motherhood-topics");
  if (topicTarget && topics.length) {
    topicTarget.innerHTML = topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("");
  }
};

const renderJournal = (items) => {
  if (!items?.length) return;
  const list = document.querySelector(".journal-list");
  if (!list) return;
  list.innerHTML = byOrder(items)
    .map((item) => `
      <article>
        <p class="meta">${escapeHtml(item.category || "")}</p>
        <h3>${escapeHtml(item.title || "Journal note")}</h3>
        <p>${escapeHtml(item.excerpt || blockText(item.fullText).slice(0, 180))}</p>
      </article>
    `)
    .join("");
};

const renderContact = (contact) => {
  if (!contact) return;
  const emailLink = document.querySelector(".contact .button-link");
  if (emailLink && contact.email) {
    emailLink.href = `mailto:${contact.email}`;
    emailLink.textContent = contact.email;
  }
  const panel = document.querySelector(".contact-panel");
  const primaryLinks = [
    contact.instagram ? {label: "Instagram", url: contact.instagram} : null,
    contact.linkedin ? {label: "LinkedIn", url: contact.linkedin} : null
  ].filter(Boolean);
  const allLinks = [...primaryLinks, ...(contact.socialLinks || [])];
  if (panel && allLinks.length) {
    const links = allLinks
      .map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
      .join("");
    panel.insertAdjacentHTML("beforeend", `<div class="social-links">${links}</div>`);
  }
};

const hydrateFromCms = async () => {
  if (!isConfigured) return;
  try {
    const data = await querySanity();
    renderHome(data.site);
    renderAbout(data.about);
    renderJourney(data.journey);
    renderPhotoWall(data.photos);
    renderTravel(data.travel);
    renderArt(data.art);
    renderShanghai(data.shanghai);
    renderMotherhood(data.motherhood);
    renderJournal(data.journal);
    renderContact(data.contact);
  } catch (error) {
    console.warn("CMS content could not be loaded; static content remains visible.", error);
  }
};

hydrateFromCms();
