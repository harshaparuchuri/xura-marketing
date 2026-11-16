import { HazeField } from "@/components/graphics/haze-field";
import { ChannelScene } from "@/components/graphics/channel-scene";
import { Reveal } from "@/components/sections/home/reveal";
import { PLATFORM_CHANNELS } from "@/data/platform";

/** Where it works — copy beside the coded WhatsApp / Slack mockup scene. */
export const PlatformChannels = () => (
  <section aria-labelledby="channels-heading" className="relative isolate overflow-hidden py-24 md:py-32">
    <HazeField variant={1} />
    <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <Reveal tag="p" className="text-sm font-medium text-muted">{PLATFORM_CHANNELS.label}</Reveal>
        <Reveal tag="h2" delay={40} className="display-light-md mt-3 max-w-[18ch]">
          <span id="channels-heading">{PLATFORM_CHANNELS.heading}</span>
        </Reveal>
        <Reveal tag="p" delay={80} className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
          {PLATFORM_CHANNELS.body}
        </Reveal>
      </div>
      <Reveal delay={80}>
        <ChannelScene />
      </Reveal>
    </div>
  </section>
);
