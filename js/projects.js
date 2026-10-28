/* ==========================================================================
   GitHub links: the ONE place to fill in every GitHub URL on the site.
   '#' means "not uploaded yet". Links still set to '#' are placeholders.
   ========================================================================== */

// Show (true) or hide (false) every GitHub link that is still '#'.
// Turn this off before sharing the site if the links aren't ready.
window.SHOW_GITHUB_PLACEHOLDERS = false;

window.GITHUB_LINKS = {
  'profile':        'https://github.com/kaykhoo07', // footer button + "View all projects on GitHub"
  'arcane-vault':   '#', // TODO: Arcane Vault repository URL (Featured work)
  'resumematch':    '#', // TODO: ResumeMatch repository URL (Featured work)
  'ecoshop':        '#'  // TODO: EcoShop repository URL (Featured work)
};

/* ==========================================================================
   "More projects" list. To add a project, add one entry here; nothing else needs changing.

   Required:  id, name, description, tags
              (id is also the key for its GitHub URL in GITHUB_LINKS above)
   Optional:  links: { demo: 'https://…' }                    (leave out if you don't have one)
              image: 'assets/images/your-file.png'            (screenshot shown at the top of the card)
              video: 'assets/videos/your-file.mp4'            (adds a "Watch demo" button; opens the lightbox)

   Cards show only the links/image/video that are filled in.
   ========================================================================== */
window.PROJECTS = [
  // Empty for now, so the "More projects" section is hidden. Example entry to copy:
  // {
  //   id: 'my-project',               // also add 'my-project': '#' to GITHUB_LINKS above
  //   name: 'My Project',
  //   description: 'One or two plain sentences about what it does.',
  //   tags: ['Python', 'Flask'],
  //   links: {},                      // e.g. { demo: 'https://…' }
  //   image: 'assets/images/my-project.png',
  //   video: 'assets/videos/my-project-demo.mp4'
  // },
];
