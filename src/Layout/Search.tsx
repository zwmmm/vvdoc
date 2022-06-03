import { Box, Input } from 'theme-ui'

export const Search = () => {
  return (
    <Box
      py={2}
      px={3}
      sx={{
        background: 'background',
        height: 36,
        width: 230,
        display: 'flex',
        borderRadius: 12,
        border: (t) => `1px solid ${t.colors?.muted}`,
      }}
    >
      <Input
        sx={{ border: 'none', outline: 'none', padding: 0, margin: 0 }}
        placeholder="搜索文档"
      />
    </Box>
  )
}
