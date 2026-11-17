"use client";

import {
  Button,
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TooltipTrigger,
  Tooltip,
} from "react-aria-components";
import { X, Info } from "lucide-react";
import type { ReactNode } from "react";

export function InfoDialog({
  trigger,
  title,
  closeLabel,
  children,
}: {
  trigger: string;
  title: string;
  closeLabel: string;
  children: ReactNode;
}) {
  return (
    <DialogTrigger>
      <Button className="fp-button fp-button--secondary">{trigger}</Button>
      <ModalOverlay className="fp-overlay">
        <Modal className="fp-modal">
          <Dialog>
            {({ close }) => (
              <>
                <div className="fp-modal__heading">
                  <Heading slot="title">{title}</Heading>
                  <Button
                    className="fp-button fp-button--quiet fp-icon-button"
                    aria-label={closeLabel}
                    onPress={close}
                  >
                    <X aria-hidden="true" size={20} />
                  </Button>
                </div>
                {children}
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

export function HelpTip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <TooltipTrigger>
      <Button
        className="fp-button fp-button--quiet fp-icon-button"
        aria-label={label}
      >
        <Info size={20} aria-hidden="true" />
      </Button>
      <Tooltip className="fp-tooltip">{children}</Tooltip>
    </TooltipTrigger>
  );
}

export function SectionTabs({
  label,
  items,
}: {
  label: string;
  items: { id: string; title: string; content: ReactNode }[];
}) {
  return (
    <Tabs className="fp-tabs">
      <TabList aria-label={label}>
        {items.map((item) => (
          <Tab id={item.id} key={item.id}>
            {item.title}
          </Tab>
        ))}
      </TabList>
      {items.map((item) => (
        <TabPanel id={item.id} key={item.id}>
          {item.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}
