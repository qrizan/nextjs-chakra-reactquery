import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { Box, Button, Collapse } from "@chakra-ui/react";

const ContentGameComponent = (params: string | any) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const cleanContent = DOMPurify.sanitize(params.content, { USE_PROFILES: { html: false } });

  return (
    <Box fontSize="sm">
      <Collapse
        startingHeight={50}
        in={show}
        dangerouslySetInnerHTML={{ __html: cleanContent.replace(/\n/g, "<br />") }}
      />
      <Button size="sm" variant="link" onClick={handleToggle} mt={3} p={0}>
        Show {show ? 'less' : 'more'}
      </Button>
    </Box>
  );
};

export default ContentGameComponent